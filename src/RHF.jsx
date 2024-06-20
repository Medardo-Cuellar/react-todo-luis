import clsx from "clsx";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function RHF() {
  // lista de todos
  const [todos, setTodos] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitted }, //los is son para validar el formulario son propiedades que nos da react-hook-form y son booleanos
  } = useForm();

  function onSubmit(data) {
    setTodos([...todos, data.todo]);
    reset();
  }

  function removeTodo(indexToRemove) {
    /*     
    
    todos.splice(indexToRemove, 1);
    setTodos([...todos]); */
    const newTodos = todos.filter((todo, index) => index !== indexToRemove);
    setTodos(newTodos);
    saveToLocalStorage();
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

  function saveToLocalStorage() {
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  function retrieveFromLocalStorage() {
    const todos = localStorage.getItem("todos");
    if (todos) {
      setTodos(JSON.parse(todos));
    }
  }

  // ya le decimos a react-hook-form que se encargue de la validación

  return (
    <main className="w-full mt-10 min-h-screen">
      <h1 className="text-center w-full bg-teal-600 text-black font-bold p-2 rounded">
        React Hook Forms
      </h1>
      <form
        className="flex flex-row gap-2 justify-center p-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          type="text"
          className={clsx("p-2 rounded text-black w-full max-w-screen-sm", {
            "border-2 border-red-500 bg-red-300": errors.todo,
          })}
          placeholder="Escribe tu tarea"
          required
          {...register("todo", {
            required: { value: true, message: "La tarea es requerida" },
            minLength: {
              value: 3,
              message: "La tarea debe tener al menos 3 caracteres",
            },
            maxLength: {
              value: 180,
              message: "La tarea debe tener menos de 180 caracteres",
            },
          })}
        />

        <button
          className="text-black px-3 rounded bg-white disabled:bg-stone-400"
          disabled={isSubmitted ? !isValid : false}
        >
          + Agregar
        </button>
      </form>
      {errors.todo && (
        <p className="max-w-screen-sm w-full mx-auto p-4 text-center text-red-600 font-bold">
          {errors.todo?.message}
        </p>
      )}
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
              {/*               <span
                className="cursor-pointer p-4 hover:rounded-full hover:bg-green-500/50"
                onClick={() => editTodo(index)}
              >
                📝
              </span> */}
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
