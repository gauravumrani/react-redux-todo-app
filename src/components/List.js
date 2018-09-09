import React, { Component } from 'react';
import { connect } from "react-redux";
import { removeTodo, checkTodo } from "../actions/index";

const mapStateToProps = state => {
  return { todos: state.todos };
};
const mapDispatchToProps = dispatch => {
  return {
    removeTodo: todo => dispatch(removeTodo(todo)),
    checkTodo: todo => dispatch(checkTodo(todo))
  };
};
class ConnectedList extends Component {
  constructor() {
    super();
    this.removeTodo = this.removeTodo.bind(this);
    this.checkTodo = this.checkTodo.bind(this);
  }
  removeTodo(el){
    this.props.removeTodo({id: el.id});
  }
  checkTodo(el){
    this.props.checkTodo({id: el.id, value: !el.check});
  }
  render() {
    let { todos } = this.props;
    const isEmpty = (!todos || !todos.length) ? true : false;
    return (
      <div id="todo-wrapper">
      <h2>Todos</h2>
      <p> {(isEmpty ? 'No Todos': '')} </p>
        <div id="todo-list">
          <ul>
            {this.props.todos.map(el => (
              <li className={'todo-item'} key={el.id}>
                <div className={'item-name '+(el.check ? 'checkItem' : '')}>{el.title}</div>
                <div>
                  <button className="btn btn-danger btn-sm" 
                  onClick={()=>this.removeTodo(el)}><i className="fa fa-trash"></i> </button>
                  &nbsp;&nbsp;
                  <button className="btn btn-success btn-sm" 
                  onClick={()=>this.checkTodo(el)}> <i className="fa fa-check"></i> </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
const List = connect(mapStateToProps, mapDispatchToProps)(ConnectedList);
export default List;