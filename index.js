import React, { Component } from 'react';
import { render } from 'react-dom';
import './style.css';
import  store  from './src/store/index';
import { Provider } from "react-redux";
import List from "./src/components/List";
import Form from "./src/components/Form";
class App extends Component {
  constructor() {
    super();
  }
  render() {
    return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-md-8"> 
          <List />
        </div>
        <div className="col-md-4">
          <Form />
        </div>
      </div>
    </div>
    );
  }
}

render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
