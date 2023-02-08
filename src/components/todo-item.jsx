import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { editTodo, resolveTodo } from "../store/slices/todoSlice";
import DeleteModal from "./delete-modal";

const TodoItem = ({ todo, serialNo }) => {
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [updatedTodo, setUpdatedTodo] = useState(todo.title);
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editTodo({ ...todo, title: updatedTodo }));
    setUpdatedTodo(inputRef.current.value);
    setEdit(false);
  };

  return (
    <>
      <tr className="border-b border-gray-300 dark:border-gray-700 dark:bg-gray-600">
        <th
          scope="row"
          className="pl-6 py-2 font-medium whitespace-nowrap bg-gray-200 dark:bg-gray-800"
        >
          {serialNo}
        </th>
        <td className="px-6 py-2 capitalize bg-gray-50 dark:bg-gray-600 dark:text-white">
          {edit ? (
            <form onSubmit={(e) => handleSubmit(e)}>
              <input
                ref={inputRef}
                onChange={(e) => setUpdatedTodo(e.target.value)}
                className="text-black p-1.5 pl-3 rounded-lg w-full"
                value={updatedTodo}
                type="text"
              />
            </form>
          ) : (
            todo?.title.substring(0, 28)
          )}
        </td>
        <td className="text-[#267191] px-6 py-2 capitalize border-x-[0.5px] border-gray-600 bg-gray-200 dark:bg-gray-800">
          {todo?.createdAt}
        </td>
        <td className="px-6 py-2 capitalize bg-gray-200 dark:bg-gray-800">
          {todo?.completed ? "Done" : "Pending"}
          <span className="text-[8px] block text-[#267191]">
            {todo?.completedAt}
          </span>
        </td>
        <td className="px-6 py-2 bg-gray-50 dark:bg-gray-600 flex items-center justify-between">
          <label className="relative inline-block items-center cursor-pointer">
            <input
              onChange={() =>
                dispatch(resolveTodo({ ...todo, completed: !todo.completed }))
              }
              type="checkbox"
              checked={todo.completed}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-blue-300 dark:peer-focus:ring-red-400 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-[#267191] dark:peer-checked:bg-red-400" />
          </label>
          <button
            onClick={() => setEdit(!edit)}
            className="bg-gray-200 dark:bg-gray-700 p-2 rounded-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                className="dark:text-white"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
          </button>

          <button
            onClick={() => setOpen(true)}
            className="bg-red-400 p-2 rounded-lg uppercase text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </button>
        </td>
      </tr>
      <DeleteModal open={open} setOpen={setOpen} todo={todo} />
    </>
  );
};

export default TodoItem;
