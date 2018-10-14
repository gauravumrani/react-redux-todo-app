var Todo = require('../models/todo');

module.exports.getTodos = async function getTodos(req, res, next) {
    try {
        const todos = await Todo.find({});
        res.status(200).send(todos);
    } catch (err) {
        next(err);
    }
};

module.exports.checkTodo = async function checkTodo(req, res, next) {
    try {
        const result = await Todo.findOneAndUpdate({ '_id': req.params.id }, { $set: { 'check': req.body.value } }, { new: true });
        if (!result) {
            next(new Error('Can update'));
        } else {
            res.status(201).send({ result });
        }
    } catch (err) {
        next(err);
    }
};

module.exports.deleteTodo = async function deleteTodo(req, res, next) {
    try {
        const result = await Todo.findOneAndRemove({ '_id': req.params.id });
        if (!result) {
            next(new Error('Cant delete'));
        } else {
            res.status(201).send(result);
        }
    } catch (err) {
        next(err);
    }
};

module.exports.addTodo = async function addTodo(req, res, next) {
    try {
        const result = await Todo.create({ 'title': req.body.title });
        if (!result) {
            next(new Error('Cant Add'));
        } else {
            res.status(201).send({ result })
        }
    } catch (err) {
        next(err);
    }
};