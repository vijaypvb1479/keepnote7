import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppRouter from './routers/AppRouter';
import {firebase} from './firebase/firebase';
import { history } from './routers/AppRouter';

ReactDOM.render(<AppRouter />, document.getElementById('root'));


firebase.auth().onAuthStateChanged((user)=>{

    if(user){
        console.log("Logged In");
        history.push('/home');
        
    } else {
            console.log("Logged Out");
            history.push('/');
    }

})