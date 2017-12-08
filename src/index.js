import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery/src/jquery';
import './index.css';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducers  from './reducers/index';
import { BrowserRouter as Router, Route } from 'react-router-dom'

window.jQuery = $;

const persistedState = localStorage.getItem('reduxState') ? JSON.parse(localStorage.getItem('reduxState')) : {};

const store = createStore(reducers,persistedState);

store.subscribe(()=>{
    localStorage.setItem('reduxState', JSON.stringify(store.getState()))
    //console.log(store.getState());
});

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Route path="/:filter?" component={App} />
        </Router>
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();