var express = require('express');
var router = express.Router();
var { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: '127.0.0.1',
  username: 'root',
  password: '123456',
  database: 'docker_todo_list'
});

const Todo = sequelize.define('Todo', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.STRING,
  }
})

sequelize.sync({force: true}).then( () => {
  console.log("同步成功！");
})


router.get('/', async (req, res) => {
  const todoList = await Todo.findAll();
  res.json({todoList});
});

router.post('/', async(req, res) => {
  const {title, status} = req.body;
  const newTodo = await Todo.create({title, status: status || 'todo'});
  res.json({todo: newTodo});
})

module.exports = router;
