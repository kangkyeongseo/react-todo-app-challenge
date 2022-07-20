import { useRecoilState, useRecoilValue } from "recoil";
import { useForm } from "react-hook-form";
import { categoryState, toDoState } from "../atoms";

interface IForm {
  todo: string;
}

function CreateToDo() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const { register, handleSubmit } = useForm<IForm>();
  const handleValid = ({ todo }: IForm) => {
    const newToDo = {
      text: todo,
      id: Date.now(),
    };
    setToDos((oldToDos) => {
      const newToDos = {
        ...oldToDos,
        [category]: [...oldToDos[category], newToDo],
      };
      return newToDos;
    });
  };
  return (
    <div>
      <form onSubmit={handleSubmit(handleValid)}>
        <input {...register("todo")} type="text" placeholder="Wirte a to do" />
        <button>Add</button>
      </form>
    </div>
  );
}

export default CreateToDo;
