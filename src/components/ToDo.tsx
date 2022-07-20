import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { categoryState, IToDo, toDoState } from "../atoms";

function ToDo({ text, id }: IToDo) {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const newCategory = event.currentTarget.name;
    setToDos((oldToDos) => {
      const targetToDoIndex = oldToDos[category].findIndex(
        (todo) => todo.id === id
      );
      const newToDo = { text, id };
      const newToDos = {
        ...oldToDos,
        [category]: [
          ...oldToDos[category].slice(0, targetToDoIndex),
          ...oldToDos[category].slice(targetToDoIndex + 1),
        ],
        [newCategory]: [...oldToDos[newCategory], newToDo],
      };
      localStorage.setItem("toDos", JSON.stringify(newToDos));
      return newToDos;
    });
  };
  return (
    <li>
      <span>{text}</span>
      {Object.keys(toDos)
        .filter((todo) => todo !== category)
        .map((todo) => (
          <button key={todo} name={todo} onClick={onClick}>
            {todo}
          </button>
        ))}
    </li>
  );
}

export default ToDo;
