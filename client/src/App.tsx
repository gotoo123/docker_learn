import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';

interface Todo {
  id: number;
  title: string;
  status: 'todo' | 'done';
}

const http = axios.create({
  baseURL: 'http://localhost:4200',
})

const App = () => {
  const [count, setCount] = useState(0);
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [newTodoTitle, setNewTodoTitle] = useState<string>('');

  const fetchCount = async() => {
    // 添加访问量
    await http.post('/count');
    // 获取访问量
    const {data} = await http.get('/count');
    setCount(data.count);

  }

  const fetchTodoList = async() => {
    // 获取所有todolist
    const { data } = await http.get('/todo');
    setTodoList(data.todoList);
  }


  const addNewTodo = async() => {
    // 添加新的todo
    await http.post('/todo');
    // 更新
    await fetchTodoList();
  }

  useEffect(() => {
    fetchCount().then();
    fetchTodoList().then();
  }, ['']);

  return (
    <div className="App">
      <header className="visit">
        <div>访问量</div>
        <div>{count}</div>
      </header>

      <div className="list">
        <ul>
          {todoList.map( item  => <li key={item.title}>{item.title} ---- {item.status}</li>)}
        </ul>

        <div>
          <input value={newTodoTitle} onChange={e => setNewTodoTitle(e.target.value)} type="text"/>
          <button onClick={addNewTodo}>提交</button>
        </div>
      </div>
    </div>
  );
}

export default App;
