import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store/index';
import List from './components/List';
import Form from './components/Form';

class App extends Component {
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
