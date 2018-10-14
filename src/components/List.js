import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removeTodo, checkTodo, fetchPosts } from '../actions/index';

const mapStateToProps = state => ({ todos: state.todos, loading: state.loading });
const mapDispatchToProps = dispatch => ({
  removeTodo: todo => dispatch(removeTodo(todo)),
  checkTodo: todo => dispatch(checkTodo(todo)),
  fetchPosts: () => dispatch(fetchPosts()),
});
class ConnectedList extends Component {
  constructor() {
    super();
    this.removeTodo = this.removeTodo.bind(this);
    this.checkTodo = this.checkTodo.bind(this);
  }

  componentDidMount() {
    this.props.fetchPosts();
  }

  removeTodo(el) {
    this.props.removeTodo({ id: el._id });
  }

  checkTodo(el) {
    this.props.checkTodo({ id: el._id, value: !el.check });
  }

  render() {
    const { todos, loading } = this.props;
    const isEmpty = !!((!todos || !todos.length));
    return (
      <div id="todo-wrapper">
        <h2>Todos</h2>
        <h4>{(loading && loading.isLoading ? loading.loadingMsg : '')}</h4>
        <p>
          {' '}
          {(isEmpty ? 'No Todos' : '')}
          {' '}
        </p>
        <div id="todo-list">
          <ul>
            {this.props.todos.map(el => (
              <li className="todo-item" key={el._id}>
                <div className={`item-name ${el.check ? 'checkItem' : ''}`}>{el.title}</div>
                <div>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.removeTodo(el)}
                  >
                    <i className="fa fa-trash" />
                  </button>
                  &nbsp;&nbsp;
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => this.checkTodo(el)}
                  >
                    {' '}
                    <i className="fa fa-check" />
                    {' '}

                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
const List = connect(mapStateToProps, mapDispatchToProps)(ConnectedList);
export default List;
