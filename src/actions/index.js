import {
  ADD_TODO, REMOVE_TODO, CHECK_TODO, FETCH_SUCCESS, LOADING,
} from '../constants/action-types';

const URL = '/api/v1/todos';

export const checkTodo = todo => function (dispatch) {
  dispatch({ type: LOADING, loadingMsg: 'Marking todo as done..' });
  return window.fetch(`${URL}/check/${todo.id}`,
    {
      method: 'PUT',
      body: JSON.stringify(todo),
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    })
    .then(res => res.json())
    .then(() => {
      dispatch({ type: CHECK_TODO, payload: todo });
      dispatch({ type: LOADING, loadingMsg: '' });
    });
};

export const removeTodo = todo => function (dispatch) {
  dispatch({ type: LOADING, loadingMsg: 'Deleting todo..' });
  return window.fetch(`${URL}/${todo.id}`,
    {
      method: 'DELETE',
    })
    .then(res => res.json())
    .then(() => {
      dispatch({ type: REMOVE_TODO, payload: todo });
      dispatch({ type: LOADING, loadingMsg: '' });
    });
};

export const addTodo = todo => function (dispatch) {
  dispatch({ type: LOADING, loadingMsg: 'Adding todos..' });
  return window.fetch(URL,
    {
      method: 'POST',
      body: JSON.stringify(todo),
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    })
    .then(res => res.json())
    .then((newTodo) => {
      dispatch({ type: LOADING, loadingMsg: '' });
      dispatch({ type: ADD_TODO, payload: newTodo.result });
    });
};

export const fetchPosts = () => (dispatch) => {
  dispatch({ type: LOADING, loadingMsg: 'Fetching todos..' });
  return window.fetch(URL)
    .then(res => res.json())
    .then(todos => dispatch({ type: FETCH_SUCCESS, payload: todos }));
};
