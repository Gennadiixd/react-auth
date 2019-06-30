import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import { BrowserRouter as Router } from 'react-router-dom';
//Redux stuff
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension'
import authService from './services/graphAuthService'
import AuthServiceContext from './components/auth-service-context/'
import reducers from './redux/combineReducer'
import thunk from 'redux-thunk'

const composeEnhancers = composeWithDevTools({})
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
    <Provider store={store}>
        <AuthServiceContext.Provider value={authService}>
            <Router>
                <App />
            </Router>
        </AuthServiceContext.Provider>
    </Provider>, document.getElementById('root'));

