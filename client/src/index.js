import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import 'materialize-css/dist/css/materialize.min.css';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';

//test
import axios from 'axios';
window.axios = axios;
const survey = {title:"title",subject:"subject",body : "thisisbody",recipients:"kihaen2@gmail.com,kihaen3@gmail.com"}
window.survey = survey;

const store = createStore(reducers, {}, applyMiddleware(reduxThunk))

ReactDOM.render(
    <Provider store ={store}>
        <App />
    </Provider>,
    document.querySelector('#root')
);
