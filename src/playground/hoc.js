import React from 'react';
import ReactDOM from 'react-dom';

const Info2 = (props) => {
    return (
        <div>
            <h1>Info:</h1>
            <p>The info is: {props.props.info}</p>
        </div>
    )
}
const withAdminWorking2 = (WrappedComponent) => {
    return (props) => {
        return (
            <div>
                <p>HOC component</p>
                <WrappedComponent props={props}/>                
            </div>
        )
    }
}
//const AdminInfo = withAdminWorking(Info);
//ReactDOM.render(<AdminInfo info='Some text'/>, document.getElementById('app'))


const Info = (props) => {
    return (
        <div>
            <h1>Info:</h1>
            <p>The info is: {props.info}</p>            
        </div>
    )
}

const withAdminWorking = (WrappedComponent) => {
    return (props) => {
        return (
            // princip je v tom ze aj v druhom returne a teda zavolani funkcie je stale dostupny WrappedComponent koli clousure, pretoze sa globalna funkcia stale neuzavrela.
            // pretoto mozeme pristupovat k inemu komponentu (Info funkcia) a vnarat ju do nadradenej HOC - Head order component
            <div>
                <p>HOC component</p>
                <WrappedComponent {...props}/>                                
            </div>
            // ...props je v tomto pripade vyuzivany ak chceme preniest vsetky par. pri volani Componentu, namiesto zapisu napr. props={props}
        )
    }
}

const AdminInfo = withAdminWorking(Info);

ReactDOM.render(<AdminInfo info='Some text'/>, document.getElementById('app'))