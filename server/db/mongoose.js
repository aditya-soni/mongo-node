var mongoose = require('mongoose');

mongoose.Promise= global.Promise;
mongoose.connect('mongodb://admin:admin@ds245478.mlab.com:45478/todo-api'|| 'mongodb://localhost:27017/TodoApp');

module.exports = {mongoose};