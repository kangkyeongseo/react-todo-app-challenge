import { atom, selector } from "recoil";
import { json } from "stream/consumers";
import { isJSDocMemberName } from "typescript";

export interface IToDo {
  text: string;
  id: number;
}

interface IToDos {
  [key: string]: IToDo[];
}

const defaultCategory = { TO_DO: [], DOING: [], DONE: [] };

const getLocal =
  localStorage.getItem("toDos") || JSON.stringify(defaultCategory);

export const categoryState = atom({
  key: "category",
  default: "TO_DO",
});

export const toDoState = atom<IToDos>({
  key: "toDo",
  default: JSON.parse(getLocal),
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos[category];
  },
});
