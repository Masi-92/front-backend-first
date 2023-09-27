import React, { useState } from 'react';
import trash from "../assets/trash.svg";
import pen from "../assets/pen.svg";
import * as api from "../api.js";

export default function ListItem({ task, list, setList }) {
  const [edit, setEdit] = useState(false);
  const [newTask, setNewTask] = useState("");

  const getData = async() => {
    const data = await api.getAllTasks();
    setList(data.map((obj)=>{
      return {title: obj.title, id:obj.id}
    }));
  }

  const handleNewTask = (evt) => {
    setNewTask(evt.target.value);
  };

  const handleEdit = async() => {
    if (newTask === "") return setEdit(false);
    await api.updateOneTask(task.id, {title:newTask});
    await getData();
  }

  const handleDelete = async() => {
    // console.log("list", list, "task", task);
    // const _list = [...list];
    // const filteredList = _list.filter((elem) => {return elem !== task});
    // console.log({filteredList});
    await api.deleteOneTask(task.id);
    await getData();
  }

  return (
    <>
      <li>{task.title}
        <div className="imageWrapper">
          <img src={pen} onClick={() => setEdit(true)} />
          <img src={trash} onClick={handleDelete} />
        </div>
      </li>
      {edit && <div className='editWrapper'>
                  <input value={newTask} onChange={handleNewTask} className='editTask' />
                  <button onClick={handleEdit}>OK</button>
                </div>}
    </>
  )
}
