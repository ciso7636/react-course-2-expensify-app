import {createStore} from 'redux';


// Ak mame vo funkcii objekt ako parameter, vieme nasledne pomocou destructuring priamo v parametry funkcii povytvarat premenne a tak si sratit zapis o jeden dalsi riadok.
// Princip hovori o tom, ze const {a,b} = data tak je vlastne to iste ako ked objekt data mame ako parameter vo funkcii, kde sa uz nemusi priradzovat z ktoreho objektu,
// sa vytvaraju premenne, kedze je to jasne, pretoze napr. prvy parameter je dany objekt, preto mozme rovno vytvorit premenne pomocou zatvoriek {} a vyuzit destructuring.

/* Klasicky priklad destructuring z objektu
*/
const add = (data) => {
    const {a,b} = data
    return a + b;
}
console.log(add({a:1, b:10}))

/* Skrateny zapis destructuring z objektu ak v parametri funkcie vieme ze mame objekt. Nemusime robit to ze {a,b} = data, aj tak by nam to vo funkcii hodilo error,
    pretoze data je undifined a prvy par. uz mame zadefinovany a zosekany na premenne pomocou destructuring {a,b}
*/
const addShort = ({a,b}) => {
    return a + b;
}
console.log(addShort({a:1, b:10}))


// Takymto funkciam, ktore vracaju objekt do dispatch hovorime action generators
// Skrateny zapis s objektom a ako parm. s default hodnotou
const incrementCount = ({incrementBy = 1} = {}) => {
    return {
        type:'INCREMENT',
        incrementBy
    }
}

//Zapis s objektom a ako parm. s default hodnotou v returne pri dekl.
const decrementCount = (obj = {}) => {
    return {
        type:'DECREMENT',
        decrementBy: typeof obj.decrementBy === 'number' ? obj.decrementBy: 1
    }
}

//Zapis s konkretnou hod. v parm. a s default hodnotou v returne pri dekl.
const setCount = (setNum) => {
    return {
        type:'SET',
        setCount: typeof setNum === 'number' ? setNum: alert('vlozte cislo')
    }
}

const store = createStore((state = {count:0}, action) => {
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
});

const unsubscribe = store.subscribe(() => {
    console.log(store.getState())
})

store.dispatch(incrementCount())

store.dispatch(incrementCount({incrementBy: 10}))

store.dispatch(decrementCount())

store.dispatch(decrementCount({decrementBy: 10}))

store.dispatch(setCount(5))

store.dispatch({
    type:'RESET'
})
