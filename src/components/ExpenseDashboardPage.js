import React from 'react';
import ExpenseList from './ExpenseList';
import ExpenseListFilters from './ExpenseListFilters';



const ExpenseDashboardPage = () => (
  <div>
    This is from my dashboard component!
    <p>Filter by name</p>
    <ExpenseListFilters/>        
    <ExpenseList/>
  </div>
);

export default ExpenseDashboardPage;
