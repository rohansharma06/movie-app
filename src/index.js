import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk  from 'redux-thunk';

import App from './components/App';
import rootReducer from './reducers';
import './index.css';

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
    if(typeof action !== 'function'){
        console.log("ACTION_TYPE:",action.type);
    }
    next(action); //-- pass to another MW if present else go to dispatch
}

// const thunk = ({ dispatch, getState}) => (next) => (action) => {
//     if(typeof action === 'function'){
//         action(dispatch);
//         return;
//     }
//     next(action); //-- pass to another MW if present else go to dispatch
// }

const store = createStore(rootReducer, applyMiddleware(logger, thunk));

//---- context is user to passs the props globally so we not need to meniton it in every component
export const StoreContext = createContext();

class Provider extends React.Component {
    render(){
        const { store } = this.props;
        return(
            <StoreContext.Provider value={store}>
                {this.props.children}
            </StoreContext.Provider>
        );
    }
}

ReactDOM.render(
    <Provider store={ store }>
        <App />
    </Provider>
    , document.getElementById('root')
);

