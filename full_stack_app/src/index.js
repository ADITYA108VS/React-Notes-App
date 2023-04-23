import React from 'react';
import ReactDOM from 'react-dom/client';
import InputField from './component/input_field';
import Home from './component/home';
import ElementManipulation from './context/element_manipulation';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div style={{ "padding": "0", "margin": "0" ,"backgroundColor":"blueviolet"}}>
    <ElementManipulation>
      <InputField />
      <Home />
    </ElementManipulation>
  </div>

);
