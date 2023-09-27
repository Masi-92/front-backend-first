import { useState, useEffect } from 'react';
import './App.scss';
import ListItem from './components/ListItem';
import axios from "axios";
import * as api from "./api.js";
import {v1 as uuidv1} from "uuid";

function App() {
  const [task, setTask] = useState("");
  const [list, setList] = useState([]);

  const getData = async ()=>{
    try {
      const data = await api.getAllTasks();
      console.log({data});
      setList(data.map((obj)=>{
        return {title:obj.title, id:obj.id}}))
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    getData();
  },[])

  const handleNewTask = async(evt) => {
    const id = uuidv1();
    try {
      evt.preventDefault();
      await api.createTask({title:task, id});
      setTask("");
      await getData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteAll = async(evt) => {
    try {
      evt.preventDefault();
      await api.deleteAllTasks();
      await getData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="app">
      <h1>Task List</h1>
      <form action="">
        <label>
          Add a new task
          <input type="text" value={task} onChange={(evt)=>setTask(evt.target.value)} />
        </label>
        <div className='buttonWrapper'>
          <button onClick={handleNewTask} >New task</button>
          <button onClick={handleDeleteAll} >Delete all</button>
        </div>
      </form>
      <div className='listWrapper'>
        <ul>
          {list.map((el, index) => (
            <ListItem key={index} task={el} list={list} setList={setList} />
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App
