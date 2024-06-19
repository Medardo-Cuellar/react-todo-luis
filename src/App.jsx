import { useState } from "react";

export default function App() {
  // lista de todos
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  function addTodo() {
    setTodos([...todos, text]);
    setText(""); //limpia el input
  }
  function dentroSubmit(event) {
    event.preventDefault();
    addTodo(); // se puede quitar el onClick porque el onsubmit lo va a ejecutar
  }

  return (
    <main className="w-full min-h-screen">
      <form
        className="flex flex-row gap-2 justify-center p-5"
        onSubmit={dentroSubmit}
      >
        <input
          type="text"
          className="p-2 rounded text-black w-full max-w-screen-sm"
          placeholder="Escribe tu tarea"
          value={text}
          onChange={(event) => setText(event.target.value)}
        />
        <button
          className="bg-white text-black px-3 rounded" /* onClick={addTodo} se quita porque ahora con el submit se pone*/
        >
          + Agregar
        </button>
      </form>
      <div className="text-white">
        {todos.map((todo, index) => {
          return <div key={`todo-${index}`}>{todo}</div>;
        })}
      </div>
    </main>
  );
}
