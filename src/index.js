import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'font-awesome/css/font-awesome.min.css'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";
import {BrowserRouter as Router} from 'react-router-dom'
import { rootReducer } from './rootReducer';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk' 
import { Provider } from 'react-redux'; 

const store=createStore(rootReducer ,{},composeWithDevTools(applyMiddleware(ReduxThunk))) 

ReactDOM.render(
  

      <Router>
    <Provider store={store}> 
        <App />
     </Provider> 
      </Router>
      ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
