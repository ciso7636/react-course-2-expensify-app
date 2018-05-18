import {createStore, combineReducers} from 'redux';
import expensesReducer from '../reducers/expenses'
import filtersReducer from '../reducers/filters'



// metoda combineReducers ktora zoskupi dva reducery a teda aj ich stavy do jedneho storu.
// kazdy reducer je ulozeny v nejakom parametry hlavneho objektu
export default () =>{
    const store = createStore(
        combineReducers({
            expenses: expensesReducer,
            filters: filtersReducer
        }),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );

    return store;
}; 
   