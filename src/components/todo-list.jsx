import React, { useState } from "react";
import { useSelector } from "react-redux";
import { paginate } from "../utils/paginate";
import Pagination from "./pagination";
import TodoItem from "./todo-item";

const TodoList = () => {
  const [pageSize] = useState(13);
  const [currentPage, setCurrentPage] = useState(1);
  const todoList = useSelector((state) => state.todos.todos);
  const searchText = useSelector((state) => state.filters.searchText);

  //* Handling Pagination
  const handlePageChange = (page) => setCurrentPage(page);

  //* Handling Sorting
  const sortType = useSelector((state) => state.filters.sortType);

  let todos;
  if (sortType === "all") todos = todoList;
  else {
    todos = todoList.filter(
      (todo) => todo.completed === (sortType === "done" ? true : false)
    );
  }

  const sortedTodos = paginate(todos, currentPage, pageSize);

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-8 w-full mb-4">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
            <tr className="text-[#267191] dark:text-red-400 border-[#267191] dark:border-red-400 border-b-[1px]">
              <th
                scope="col"
                className="pl-6 py-4 text-base bg-gray-200 dark:bg-gray-800"
              >
                No
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-base bg-gray-200 dark:bg-gray-800"
              >
                Task
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-base bg-gray-200 dark:bg-gray-800"
              >
                Created
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-base bg-gray-200 dark:bg-gray-800"
              >
                status
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-base bg-gray-200 dark:bg-gray-800"
              >
                action
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedTodos
              .filter((todo) =>
                todo?.title.toLowerCase().includes(searchText.toLowerCase())
              )
              .map((todo, i) => (
                <TodoItem key={todo.id} todo={todo} serialNo={i + 1} />
              ))}
          </tbody>
        </table>
      </div>
      <Pagination
        itemsCount={todos.length}
        pageSize={pageSize}
        onPageChange={handlePageChange}
        currentPage={currentPage}
      />
    </>
  );
};

export default TodoList;
