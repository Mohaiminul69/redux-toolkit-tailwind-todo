import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { sortTodo } from "../store/slices/filterSlice";

const Sort = () => {
  const refAll = useRef();
  const refPending = useRef();
  const refDone = useRef();

  const dispatch = useDispatch();

  const toggleFilter = (refId) => {
    refAll.current.checked = false;
    refPending.current.checked = false;
    refDone.current.checked = false;
    if (refAll.current.id === refId) refAll.current.checked = true;
    else if (refPending.current.id === refId) refPending.current.checked = true;
    else if (refDone.current.id === refId) refDone.current.checked = true;
    dispatch(sortTodo(refId));
  };

  return (
    <div className="absolute left-0">
      <div>
        <h3 className="mb-2 text-md font-medium text-gray-900 dark:text-white ml-2">
          Sort Tasks
        </h3>
        <ul className="flex space-x-2">
          <li>
            <input
              ref={refAll}
              type="checkbox"
              id="all"
              defaultValue
              className="hidden peer"
              required
              onClick={() => toggleFilter("all")}
            />
            <label
              htmlFor="all"
              className="inline-flex items-center justify-between w-fit px-2 py-0.5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-[#267191] dark:peer-checked:border-red-300 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              <div className="w-full text-md font-semibold">All</div>
            </label>
          </li>
          <li>
            <input
              ref={refPending}
              type="checkbox"
              id="pending"
              defaultValue
              className="hidden peer"
              onClick={() => toggleFilter("pending")}
            />
            <label
              htmlFor="pending"
              className="inline-flex items-center justify-between w-fit px-2 py-0.5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-[#267191] dark:peer-checked:border-red-300 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              <div className="w-full text-md font-semibold">Pending</div>
            </label>
          </li>
          <li>
            <input
              ref={refDone}
              type="checkbox"
              id="done"
              defaultValue
              className="hidden peer"
              onClick={() => toggleFilter("done")}
            />
            <label
              htmlFor="done"
              className="inline-flex items-center justify-between w-fit px-2 py-0.5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-[#267191] dark:peer-checked:border-red-300 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              <div className="w-full text-md font-semibold">Done</div>
            </label>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sort;
