import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import firebase from 'firebase';
import Router from './Router';
class App extends Component{
    componentWillMount(){
        const config = {
            apiKey: 'AIzaSyAsGveY8GUBx6kVG89mFLprHz70dcaXEXA',
            authDomain: 'manager-eda1b.firebaseapp.com',
            databaseURL: 'https://manager-eda1b.firebaseio.com',
            projectId: 'manager-eda1b',
            storageBucket: 'manager-eda1b.appspot.com',
            messagingSenderId: '592302013890'
        };
        firebase.initializeApp(config);
    }
    render(){
        const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
        
        return(
            <Provider store={store}>
                <Router />
            </Provider>
        );
    }
        
}

export default App;