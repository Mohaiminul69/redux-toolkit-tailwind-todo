import { format } from "date-fns";
import { toast } from "react-hot-toast";
import axios from "../utils/axios.config";

export const fetchTodos = async () => {
  const { data } = await axios.get("/todos");
  return data;
};

export const postTodo = async (data) => {
  data.createdAt = format(new Date(), "dd-MM-yyyy");
  const res = await axios.post("/todos", data);

  if (res.status === 201) {
    toast.success("Task added Successfully!", {
      icon: "👏",
      style: {
        borderRadius: "5px",
        background: "#d06d6d",
        color: "#fff",
      },
    });
    return data;
  }
};

export const patchTodo = async (data) => {
  data.createdAt = format(new Date(), "dd-MM-yyyy");
  const res = await axios.patch(`/todos/${data.id}`, data);

  if (res.status === 200) {
    toast.success("Title changed Successfully!", {
      icon: "👏",
      style: {
        borderRadius: "5px",
        background: "#d06d6d",
        color: "#fff",
      },
    });
    return data;
  }
};

export const deleteTodo = async (id) => {
  const data = await axios.delete(
    `https://jsonplaceholder.typicode.com/todos/${id}`
  );

  if (data.status === 200) {
    toast("Task has been Deleted!", {
      icon: "👏",
      style: {
        borderRadius: "5px",
        background: "#d06d6d",
        color: "#fff",
      },
    });
    return id;
  }
};

export const todoStatusChange = async (data) => {
  data.completedAt = format(new Date(), "dd-MM-yyyy");
  const res = await axios.patch(
    `https://jsonplaceholder.typicode.com/todos/${data.id}`,
    data
  );

  if (res.status === 200) {
    toast.success("Status changed Successfully!", {
      icon: "👏",
      style: {
        borderRadius: "5px",
        background: "#d06d6d",
        color: "#fff",
      },
    });
    return data;
  }
};
