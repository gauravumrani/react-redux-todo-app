const mongoose = require('mongoose');

const { Schema } = mongoose;

const Todo = new Schema({
	title: String,
	check: { type: Boolean, default: false },
},
	{ timestamps: true });

module.exports = mongoose.model('todos', Todo);
