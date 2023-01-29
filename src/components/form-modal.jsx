import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Field, Form } from "react-final-form";
import { useDispatch, useSelector } from "react-redux";
import { addTodo } from "../store/slices/todoSlice";

export default function Example({ open, setOpen }) {
  const cancelButtonRef = useRef(null);
  const dispatch = useDispatch();
  const taskList = useSelector((state) => state.todos.todos);
  const taskInput = useRef(null);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={taskInput}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-start sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="relative w-full h-full max-w-md md:h-auto">
                {/* Modal content */}
                <div className="relative bg-gray-700 rounded-lg shadow dark:bg-gray-700">
                  <button
                    type="button"
                    ref={cancelButtonRef}
                    onClick={() => setOpen(false)}
                    className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                    data-modal-hide="authentication-modal"
                  >
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                  <div className="px-6 py-6 lg:px-8">
                    <h3 className="mb-4 text-center text-xl font-medium text-white dark:text-white">
                      Assign a task for you
                    </h3>
                    <Form
                      onSubmit={(formObj) => {
                        formObj.id = taskList.length + 1;
                        formObj.completed = false;
                        dispatch(addTodo(formObj));
                        setOpen(false);
                      }}
                    >
                      {({ handleSubmit }) => (
                        <form
                          onSubmit={handleSubmit}
                          className="space-y-6"
                          action="#"
                        >
                          <div>
                            <label
                              htmlFor="task"
                              className="block mb-2 text-sm font-medium text-white dark:text-white"
                            >
                              Task
                            </label>
                            <Field name="title">
                              {({ input, meta }) => (
                                <input
                                  type="text"
                                  ref={taskInput}
                                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                  placeholder="Take lunch"
                                  required
                                  {...input}
                                />
                              )}
                            </Field>
                          </div>
                          <button
                            type="submit"
                            className="w-full text-white bg-blue-400 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-400 dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                          >
                            Add Task
                          </button>
                        </form>
                      )}
                    </Form>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
