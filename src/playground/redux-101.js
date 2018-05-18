import {createStore} from 'redux';

const store = createStore((state = {count:0}, action) => {
    switch(action.type){
        case 'INCREMENT':
            const incrementBy = typeof action.incrementBy === 'number' ? action.incrementBy : 1
            return {
                count: state.count + incrementBy
            }
        case 'DECREMENT':
            return {
                count: state.count - 1
            }
        case 'RESET':
            return {
                count: state.count = 0
            }
        default:
        return state;
    }
});

// type je povinna property pre action metodu dispatch pomocou ktorej mozeme menit stav nasho storu
// Po kazdom zavolani dispatch sa zavola aj createStore() pretoze dispatch musi byt naviazany na tuto zakladnu metodu ktora vytvara cely store
// Store sme si ulozili do premmenej s rovnakym nazvom, teda store
// createStore() umozni vytvorit pociatocny state, ktory sa viaze na prvy parameter metody,
// druhy parameter je vyhradeny pre akciu z dispatchu, bude teda obsahovat cely objekt dispatch (po zavolani)
// nepisane pravidla pre hodnoty typu su take, ze nazvy akcii sa pisu uppercasom


// subscribe je metoda v store ktora je tzv. listenerom a robi vlastne to, ze reaguje na zmenu stavu v store.
// ak chceme listener subscribe() na nejakom mieste odstranit, staci ho zavolat znova, preto sme si ulizili subscribe do premmenej, ktoru ak zavolame unsubscribe() zrusi sa listener
// S tou premmenou je to taky "best practice" ako znovu zavolat dany subscribe() a tym padom ho zrusit.
const unsubscribe = store.subscribe(() => {
    console.log(store.getState())
})


// do dispatch mozeme okrem povinneho parametra type, vkladat hocijake ine property objektu a tak urobit dany dispatch viac dynamickym
store.dispatch({
    type:'INCREMENT',
    incrementBy: 5
})

store.dispatch({
    type:'INCREMENT'
})


//v tomto bode uz subscribe neregistruje zmenu stavu a preto nezaregistruje zmenu pri dalsom dispatch.
// consol log spusti teda len dva krat 
unsubscribe()

store.dispatch({
    type:'DECREMENT'
})

store.dispatch({
    type:'RESET'
})
