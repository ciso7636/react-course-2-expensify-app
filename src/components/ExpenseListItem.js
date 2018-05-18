import React from 'react';
import { Link } from 'react-router-dom';

// update ver. 
const ExpenseListItem = ({ id, description, amount, createdAt }) => (
    <div>
      <Link to={`/edit/${id}`}>
        <h3>{description}</h3>
      </Link>
      <p>{amount} - {createdAt}</p>
    </div>
  );
  
  export default ExpenseListItem;



// old ver.  
import { connect } from 'react-redux';
import {removeExpense} from '../actions/expenses';

const ExpenseListItemOld = ({dispatch, description, id, amount, createAt}) => (
    <div>
        <h3>{description}</h3>
        <p>{amount} - {createAt}</p>
        <button onClick={(e) => {
            dispatch(removeExpense({id}))
        }}>
            Remove
        </button>
    </div>
)
//export default ExpenseListItem;

/*export default connect()(ExpenseListItemOld);*/

// connect() hoci je prazdny vyuzijeme ho koli tomu aby sme do komponentu dostali metodu dispatch, ktorou chceme zavolat akciu na zmenu storu.
// pri pouziti connect sa dispatch automaticky prenesie do zvoleneho komponentu ako prvy argument.
// connect() nema nasetovany stateToProps, pretoze ho nepotrebujeme, kedze tento komponent ma parametre z jeho rodickovskeho komponentu ExpenseList, preto je connect bez parametra.
// pri nasom destructuring zapise poradie nemusi byt dodrzane kedze premenne sa jedna uz o vytvorenne premenne ({dispatch, description, id, amount, createAt})
// jedine co musi sediet su nazvy attributov v objekte ktory je prijimany ako parameter do komponentu