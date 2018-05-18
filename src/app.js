import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore'
import { addExpense } from './actions/expenses'
import { sortByAmount, sortByDate, setTextFilter } from './actions/filters'
import getVisibleExpendes from './selectors/expenses'
import 'normalize.css/normalize.css';
import './styles/styles.scss';

const store = configureStore();


store.dispatch(addExpense({description:'First expenses', amount:10, createAt:1000}))
store.dispatch(addExpense({description:'Second expenses', amount:20, createAt:2000}))
store.dispatch(addExpense({description:'Third expenses', amount:30, createAt:3000}))
store.dispatch(addExpense({description:'Fourth expenses', amount:22, createAt:23000}))


console.log(store.getState())
const state = store.getState();
console.log(getVisibleExpendes(state.expenses, state.filters))

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);



ReactDOM.render(jsx, document.getElementById('app'));
