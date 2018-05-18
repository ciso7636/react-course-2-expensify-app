import {createStore} from 'redux';

const incrementCount = ({incrementBy = 1} = {}) => {
    return {
        type:'INCREMENT',
        incrementBy
    }
}

const decrementCount = ({decrementBy = 1} = {}) => {
    return {
        type:'DECREMENT',
        decrementBy
    }
}

const setCount = (setNum) => {
    return {
        type:'SET',
        setCount: typeof setNum === 'number' ? setNum: alert('vlozte cislo')
    }
}

// Reducers specifikuju to, ako sa ma zmenit state v store.
// Vysledok takejto funkcie je objekt/y ktory nastavy state na pozadovanu hodnotu a ulozi do storu.
// kedze nasa funkcia (reducer) je pouzita v createStore jej parvy parameter bude naplneny o state a druhy o action  

// Pozivanie Reducers ma dve zakladne pravidla:
//1. Pouzivame nato pure functions, tzn ze ide o funkcie ktore pracuju vyhrade s datami, ktore su ulozene v parametroch a neberu data z "vonku", teda mimo funkcie,  
//   a taktiez ani nemenia ziadne data ktore su ulozene mimo funkciu. Sluzi proste nato ze prijme nejake vstupne data a na konci nieco vrati
//2. Nikdy nemenime priamo hodnotu stavu (state), alebo akcie(action). Tieto hodnoty su na citanie a menia sa len objekty ktore vracaju novy stav ktory
//   zly zapis ------- state.count = state.count + 1, 
//   spravny zapis --- return{count: state.count + 1} 

// funkcia countReducer dodrzuje obe tieto pravidla a preto ju mozeme povazovat za pure function a pozit ju ako Reducer v store.
const countReducer = (state = {count:0}, action) => {
    switch(action.type){
        case 'INCREMENT':
            return {
                count: state.count + action.incrementBy
            }
        case 'DECREMENT':
            return {
                count: state.count - action.decrementBy
            }
        case 'RESET':
            return {
                count: state.count = 0
            }
        case 'SET':
            return {
                count: state.count = action.setCount
            }
        default:
        return state;
    }
}

// createStore, ocakava ako par. funckiu (callbackovu), ktoru automaticky spusta, preto netreba nasu funckiu countReducer spustat pomocou ().
const store = createStore(countReducer);

const unsubscribe = store.subscribe(() => {
    console.log(store.getState())
})

store.dispatch(incrementCount())

store.dispatch(incrementCount({incrementBy: 10}))

store.dispatch(decrementCount())

store.dispatch(decrementCount({decrementBy: 10}))

store.dispatch({type:'RESET'})

store.dispatch(setCount(5))

