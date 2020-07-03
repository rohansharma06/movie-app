import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';

import './index.css';
import App from './components/App';
import rootReducer from './reducers';


// function logger(obj,next,action)
//logger(obj)(next)(action)
//-- obj ={dispatch, getState}
//--- using curring

    // const logger = function({ dispatch, getState}){
    //     return function(next){
    //         return function(action){
    //             console.log("ACTION_TYPE:",action.type);
    //             next(action); //-- pass to another MW if present else go to dispatch
    //         }
    //     }
    // }

//--- diff to call function
const logger = ({ dispatch, getState}) => (next) => (action) => {
    console.log("ACTION_TYPE:",action.type);
    next(action); //-- pass to another MW if present else go to dispatch
}

const store = createStore(rootReducer, applyMiddleware(logger));

ReactDOM.render(<App store={store} />, document.getElementById('root'));

