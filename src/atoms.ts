import { atom, selector } from "recoil";

export interface IToDo {
  text: string;
  id: number;
}

interface IToDos {
  [key: string]: IToDo[];
}

export const categoryState = atom({
  key: "category",
  default: "TO_DO",
});

export const toDoState = atom<IToDos>({
  key: "toDo",
  default: { TO_DO: [], DOING: [], DONE: [] },
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos[category];
  },
});
