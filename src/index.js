import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import ProviderComponent from "./component/Provider";
  

ReactDOM.render(
 <>
   <ProviderComponent>
   <App />
  </ProviderComponent>
 </> ,
  document.getElementById('root')
);
