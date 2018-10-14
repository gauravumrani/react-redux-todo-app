const express = require('express');
const todoController = require('../controllers/todo.controller.js');

const Router = express.Router();
const BASE_URL = '/v1/todos';

// get all todos
Router.get(BASE_URL, todoController.getTodos);

// update a todo
Router.put(`${BASE_URL}/check/:id`, todoController.checkTodo);

// delete a todo
Router.delete(`${BASE_URL}/:id`, todoController.deleteTodo);

// add a todo
Router.post(BASE_URL, todoController.addTodo);

module.exports = Router;
