import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { categoryState, toDoSelector, toDoState } from "../atoms";
import CreateCategory from "./CreateCategory";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

function ToDoList() {
  const toDos = useRecoilValue(toDoState);
  const selectToDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (evnet: React.FormEvent<HTMLSelectElement>) => {
    setCategory(evnet.currentTarget.value);
  };
  return (
    <div>
      <h1>To Do List</h1>
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
