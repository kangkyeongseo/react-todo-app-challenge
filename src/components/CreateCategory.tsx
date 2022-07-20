import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { categoryState, toDoState } from "../atoms";

interface ICategoryForm {
  category: string;
}

function CreateCategory() {
  const setToDos = useSetRecoilState(toDoState);
  const { register, handleSubmit } = useForm<ICategoryForm>();
  const setCategory = useSetRecoilState(categoryState);
  const onVaild = ({ category }: ICategoryForm) => {
    setCategory(category);
    setToDos((oldToDos) => {
      const newToDos = {
        ...oldToDos,
        [category]: [],
      };
      localStorage.setItem("toDos", JSON.stringify(newToDos));
      return newToDos;
    });
  };
  return (
    <form onSubmit={handleSubmit(onVaild)}>
      <input
        {...register("category")}
        type="text"
        placeholder="Write a Category"
      />
      <button>Add Category</button>
    </form>
  );
}

export default CreateCategory;
