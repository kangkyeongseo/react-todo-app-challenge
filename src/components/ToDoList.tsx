import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { categoryState, toDoSelector, toDoState } from "../atoms";
import CreateCategory from "./CreateCategory";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

function ToDoList() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const selectToDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (evnet: React.FormEvent<HTMLSelectElement>) => {
    setCategory(evnet.currentTarget.value);
  };
  const deleteCategory = () => {
    setToDos((oldToDos) => {
      const newToDos = { ...oldToDos };
      delete newToDos[category];
      localStorage.setItem("toDos", JSON.stringify(newToDos));
      return newToDos;
    });
    setCategory((oldCategory) => {
      if (Object.keys(toDos).length === 1) {
        return oldCategory;
      }
      if (Object.keys(toDos)[0] === oldCategory) {
        return Object.keys(toDos)[1];
      }
      return Object.keys(toDos)[0];
    });
  };
  return (
    <div>
      <h1>To Do List</h1>
      <div style={{ display: "flex" }}>
        <h3>{category}</h3>
        <button onClick={deleteCategory}>❌</button>
      </div>
      <CreateCategory />
      <select value={category} onInput={onInput}>
        {Object.keys(toDos).map((todo) => (
          <option key={todo} value={todo}>
            {todo}
          </option>
        ))}
      </select>
      <CreateToDo />
      <ul>
        {selectToDos.map((todo) => (
          <ToDo key={todo.id} {...todo} />
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
