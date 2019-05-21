import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createStore} from "redux";
import {combineReducers} from "redux";
import {Provider} from 'react-redux';
import {authReducer} from './reducers/auth-reducer';
import {jupitModalReducer} from "./reducers/jupit-modal-reducer";
import {searchReducer} from "./reducers/search-mode-reducer";
// import {searchSubj} from "./reducers/search-subj-reducer";
import {profileReducer} from "./reducers/ProfileReducer";

import {searchResultsReducer} from "./reducers/searchResultsReducer";

const allReducers = combineReducers(
    {
        authorization: authReducer,
        jupitModal: jupitModalReducer,
        search: searchReducer,
        searchResult: searchResultsReducer,
        profile: profileReducer
    }
);
export const store = createStore(allReducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
