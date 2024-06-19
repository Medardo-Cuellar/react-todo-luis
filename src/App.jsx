import { useState } from "react";

export default function App() {
  // lista de todos
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  function addTodo() {
    setTodos([...todos, text]);
    setText(""); //limpia el input
  }
  function alEnviar(event) {
    event.preventDefault();
    addTodo(); // se puede quitar el onClick porque el onsubmit lo va a ejecutar
  }

  function removeTodo(indexToRemove) {
    /*     
    todos.splice(indexToRemove, 1);
    setTodos([...todos]); */
    const newTodos = todos.filter((todo, index) => index !== indexToRemove);
    setTodos(newTodos);
  }

  function editTodo(index) {
    const newTodos = todos.map((todo, i) => {
      if (i === index) {
        return prompt("Edita tu tarea", todo);
      }
      return todo;
    });
    setTodos(newTodos);
  }

  return (
    <main className="w-full min-h-screen">
      <form
        className="flex flex-row gap-2 justify-center p-5"
        onSubmit={alEnviar}
      >
        <input
          type="text"
          className="p-2 rounded text-black w-full max-w-screen-sm"
          placeholder="Escribe tu tarea"
          value={text}
          onChange={(event) => setText(event.target.value)}
          required
        />
        <button
          className="bg-white text-black px-3 rounded" /* onClick={addTodo} se quita porque ahora con el submit se pone*/
        >
          + Agregar
        </button>
      </form>
      <div className="max-w-screen-sm w-full mx-auto p-4">
        {todos.length === 0 && (
          <p className="bg-white/50 rounded p-4 m-4 flex flex-row justify-center">
            no tienes tareas pendientes 🤷‍♀️
          </p>
        )}
        {todos.map((todo, index) => {
          return (
            <div
              key={`todo-${index}`}
              className="bg-white/10 rounded p-4 m-4 flex flex-row gap-4 justify-between"
            >
              <span className="flex-grow p-4">{todo}</span>
              <span
                className="cursor-pointer p-4 hover:rounded-full hover:bg-green-500/50"
                onClick={() => editTodo(index)}
              >
                📝
              </span>
              <span
                className="cursor-pointer p-4 hover:rounded-full hover:bg-red-500/50"
                onClick={() => removeTodo(index)}
              >
                ❌
              </span>
            </div>
          );
        })}
      </div>
    </main>
  );
}
