const expenseReducerDefaultState = [];

// ani concat, alebo spread a ani filter nemenia stav ako napr. metoda push, ktora by sa nemala pouzivat pretoze sa vylucuje s pravidlom o reduceroch, ktore hovori ze stav(state) sa nema menit, ale iba citat
// concat, spread aj filter vytvoria nove pole, ktore vratime(return) a neprepisuju povodne, ktore je v state.
export default (state = expenseReducerDefaultState, action) => {
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