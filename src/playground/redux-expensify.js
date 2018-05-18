import {createStore, combineReducers} from 'redux';
import uuid from 'uuid';


const addExpense = ({description = '', note = '', amount = 0, createAt = 0 } = {}) => (
    {
        type:'ADD_EXPENSE',
        expenses:{
            id: uuid(),
            description,
            note,
            amount,
            createAt
        }
    }
)

const removeExpense = ({id} = {}) => (
    {
        type:'REMOVE_EXPENSE',
        id
    }
)

const editExpense = (id, updates) => (
    {
        type:'EDIT_EXPENSE',
        id,
        updates
    }
)

const expenseReducerDefaultState = [];

// ani concat, alebo spread a ani filter nemenia stav ako napr. metoda push, ktora by sa nemala pouzivat pretoze sa vylucuje s pravidlom o reduceroch, ktore hovori ze stav(state) sa nema menit, ale iba citat
// concat, spread aj filter vytvoria nove pole, ktore vratime(return) a neprepisuju povodne, ktore je v state.
const expensesReducer = (state = expenseReducerDefaultState, action) => {
    switch(action.type){
        case 'ADD_EXPENSE':
            //return state.concat(action.expenses) 
            //spread zapis
            return [
                ...state,
                action.expenses
            ];    
        case 'REMOVE_EXPENSE':
            //return state.filter((obj) => (obj.id !== action.id))  // klasicky zapis kde v callbackovej funkcii metody filter je ako oprvy parameter hodnota z Array a kedze je to objekt, tak prvy par. je cely objekt z ktoreho mozeme naledne vybrat nejaku hodnotu, dat podmienku a urobit odfiltrovany return        
            return state.filter(({id}) => (id !== action.id)); // skrateny zapis pomocou destructuring, kedze prvy par. vo funkcii je objekt, mozem rovno z neho vytvorit premennu z hodnotu              
        case 'EDIT_EXPENSE':
            return state.map((expense) => { // metoda map taktiez nezmeni povodne pole, ale vytvori z neho nove. Rozdiel medzi filter a map je ten, ze filter vo svojom callback returne pouziva boolean, ktory vrati hodnotu ktora vyhovuje a map v returne priamo vysledny objekt, ktory mozeme aj upravovat, alebo ho rozsirit kedze k nemu mame pristup.
                if(expense.id === action.id){
                    // vytvorenie noveho objektu pomocou spread nieje mozne v default ES6 (je podporovane len pre array), pouzivame preto plugin od babelu: babel-plugin-transform-object-rest-spread
                    return{...expense, ...action.updates}
                }
                else{
                    return expense
                }
            })
        default:
         return state
    }
};

// SET_TEXT_FILTER
const setTextFilter = (text = '') => ({
    type: 'SET_TEXT_FILTER',
    text
  });
  
  // SORT_BY_DATE
  const sortByDate = () => ({
    type: 'SORT_BY_DATE'
  });
  
  // SORT_BY_AMOUNT
  const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT'
  });
  
  // SET_START_DATE
  const setStartDate = (startDate) => ({
    type: 'SET_START_DATE',
    startDate
  });
  
  // SET_END_DATE
  const setEndDate = (endDate) => ({
    type: 'SET_END_DATE',
    endDate
  });

const filtersReducerDefaultState = {
    text: '',
    sortBy: 'amount',
    startDate: undefined,
    endDate: undefined
}

const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch(action.type){
        case 'SET_TEXT_FILTER':
        return {
            ...state,
            text: action.text
          };
        case 'SORT_BY_AMOUNT':
          return {
            ...state,
            sortBy: 'amount'
          };
        case 'SORT_BY_DATE':
          return {
            ...state,
            sortBy: 'date'
          };
        case 'SET_START_DATE':
          return {
            ...state,
            startDate: action.startDate
          };
        case 'SET_END_DATE':
          return {
            ...state,
            endDate: action.endDate
          };
        default:
         return state
    }
};

const getVisibleExpense = (expenses, {text, sortBy, startDate, endDate}) => {
    return expenses.filter((expense) => {
        const startDateMatch = typeof startDate !== 'number' || expense.createAt >= startDate; // sikovny zapis do jedneho riadky, ktory zabezpeci ze ak je hodnota cislo tak je false a tym padom este musi zbehnut aj druha podmienka
        const endDateMatch = typeof endDate !== 'number' || expense.createAt <= endDate;
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase()); // metoda includes pre ktora vracia boolean ci sa nachadza string v stringu. Je to namiesto indexOf, ktory vracia indes ak najde zhodu    

        return startDateMatch && endDateMatch && textMatch;
    }).sort(function (a, b) { // metoda sort spolu s callback funkciou ktora ma dva par. cize hodnoty z pola, ktore porovnava a nasledne vrati 1 alebo -1
        if(sortBy === 'date'){
            return a.createAt < b.createAt ? 1 : -1;
        }
        else if(sortBy === 'amount'){
            return a.amount < b.amount ? 1 : -1;
        }
    })
}

// metoda combineReducers ktora zoskupi dva reducery a teda aj ich stavy do jedneho storu.
// kazdy reducer je ulozeny v nejakom parametry hlavneho objektu
const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer
    })
);


store.subscribe(() =>{
    const state = store.getState() 
    const visibleExpense = getVisibleExpense(state.expenses, state.filters)
    console.log(visibleExpense)
})


const expenseOne = store.dispatch(addExpense({ description: 'Rent', amount: 160, createAt: 124 }));
const expenseTwo = store.dispatch(addExpense({ description: 'Coffee', amount: 150, createAt: 1250 }));

// store.dispatch(removeExpense({ id: expenseOne.expense.id }));
// store.dispatch(editExpense(expenseTwo.expense.id, { amount: 500 }));

// store.dispatch(setTextFilter('rent'));
// store.dispatch(setTextFilter());

// store.dispatch(sortByAmount());
// store.dispatch(sortByDate());

// store.dispatch(setStartDate(125)); // startDate 125
// store.dispatch(setStartDate()); // startDate undefined
// store.dispatch(setEndDate(1250)); // endDate 1250
// store.dispatch(setTextFilter('coff')); // endDate 1250





