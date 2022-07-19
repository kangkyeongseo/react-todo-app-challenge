import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue } from "recoil";
import { toDoState } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

function ToDoList() {
  const todos = useRecoilValue(toDoState);
  return (
    <div>
      <h1>To Do List</h1>
      <CreateToDo />
      <ul>
        {todos.map((todo) => (
          <ToDo key={todo.id} {...todo} />
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
