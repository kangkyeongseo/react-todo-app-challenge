interface IProp {
  text: string;
}

function ToDo({ text }: IProp) {
  return (
    <li>
      <span>{text}</span>
      <button>To Do</button>
      <button>Doing</button>
      <button>Done</button>
    </li>
  );
}

export default ToDo;
