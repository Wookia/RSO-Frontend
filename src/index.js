import React from 'react';
import ReactDOM from 'react-dom';
import { App, localStorageKey } from './App';
import registerServiceWorker from './registerServiceWorker';

let state = JSON.parse(localStorage.getItem(localStorageKey));
if (state.user.expiration > new Date())
    state = undefined;
ReactDOM.render(<App savedState={state}/>, document.getElementById('root'));
registerServiceWorker();


//TODO:
//lepsza prezentacja itemów w menu
//edytowanie zamówień
//dodawanie uprawnień pracownikom
//rezerwacja
//