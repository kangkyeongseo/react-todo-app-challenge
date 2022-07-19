import { useRecoilState } from "recoil";
import { useForm } from "react-hook-form";
import { toDoState } from "../atoms";

interface IForm {
  todo: string;
}

function CreateToDo() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const { register, handleSubmit } = useForm<IForm>();
  const handleValid = ({ todo }: IForm) => {
    setToDos((oldToDos) => [
      { text: todo, id: Date.now(), category: "TO_DO" },
      ...oldToDos,
    ]);
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
