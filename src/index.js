import React from 'react';
import ReactDOM from 'react-dom';
import { App, localStorageKey } from './App';
import registerServiceWorker from './registerServiceWorker';

let state = JSON.parse(localStorage.getItem(localStorageKey));
ReactDOM.render(<App savedState={state}/>, document.getElementById('root'));
registerServiceWorker();
