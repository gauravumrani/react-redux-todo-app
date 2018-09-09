import React, { Component } from "react";
import { connect } from "react-redux";
import uuidv1 from "uuid";
import { addTodo } from "../actions/index";

const mapDispatchToProps = dispatch => {
  return {
    addTodo: todo => dispatch(addTodo(todo))
  };
};

class ConnectedForm extends Component {
  constructor() {
    super();
    this.state = {
      title:'',
      isEmpty: false 
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value, isEmpty: false });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { title } = this.state;
    if(title.trim() == ""){
      this.setState({ isEmpty: true });
      return;
    }
    const id = uuidv1();
    this.props.addTodo({ title, id });
    this.setState({ title: "" });
  }

  render() {
    const { title, isEmpty } = this.state;
    return (
      <div id="todo-wrapper">
        <h2>Add a new todo</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="title"
              value = {title}
              onChange={this.handleChange}
              autoComplete = "off"
            />
            <span className='text-danger'> {(isEmpty ? 'Todo can not be empty': '')} </span>
          </div>
          <button type="submit" className="btn btn-success">
            SAVE
          </button>
        </form>
      </div>
    );
  }
}

const Form = connect(null, mapDispatchToProps)(ConnectedForm);

export default Form;