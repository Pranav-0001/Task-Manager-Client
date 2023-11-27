import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTasks } from "../api/getTasks";
import { addTask } from "../redux/user/TasksSlice";
import CreateTaskModal from "./modal/CreateTaskModal";
import { updateModal } from "../redux/user/modalSlice";
import { io } from "socket.io-client";
import { ENDPOINT } from "../constants";
import { emitEvent, onEvent, setSocket } from "../redux/user/socketSlice";

export default function TasksTable() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);

  const dispatch = useDispatch();

  const socket = useSelector((state) => state.socket.socket);
  const { userId } = useSelector((state) => state.user);
  const { tasks } = useSelector((state) => state.task);
  console.log({ userId });

  const handleBroadcastTask = (task) => {
    const updatedTasks = [task, ...tasks].slice(0, 8);
    dispatch(addTask(updatedTasks));
  };
  
  useEffect(() => {
    const newSocket = io(ENDPOINT);
    dispatch(setSocket(newSocket));
    dispatch(emitEvent({ event: "login", data: userId }));
    dispatch(
      onEvent({
        event: "broadcast-task",
        callback:handleBroadcastTask,
      })
    );

    return () => {
      newSocket.disconnect();
    };
  }, [dispatch, userId, tasks]);
  useEffect(() => {
    (async () => {
      const { tasks } = await getAllTasks(page, limit);
      dispatch(addTask(tasks));
    })();

    return () => {};
  }, [dispatch]);

  const { modal } = useSelector((state) => state.modal);

  console.log({ tasks });

  return (
    <>
      {modal === "createTaskModal" && <CreateTaskModal />}
      <div className="pt-16 ">
        <div className="px-4 lg:px-56 text-end">
          <button
            onClick={() => dispatch(updateModal({ modal: "createTaskModal" }))}
            className="bg-green-700 px-8 py-2 rounded shadow mb-4 text-white"
          >
            Add Task
          </button>
        </div>

        <div className="flex justify-center  px-4  ">
          <table className="lg:w-3/4 w-full ">
            <thead className="text-left h-14 border">
              <th>Sl.No</th>
              <th>Title</th>
              <th className="w-72">Description</th>
              <th>Created By</th>
              <th>Created On</th>
              <th>Status</th>
              <th className="w-72">Options</th>
              <th></th>
            </thead>
            <tbody>
              {tasks.map((task, index) => (
                <tr className="border-x-2 border-b-2 h-10">
                  <td className="px-3 py-2">
                    {limit * (page - 1) + index + 1}
                  </td>
                  <td className="px-3 py-2">{task.title}</td>
                  <td className="px-3 py-2">{task.description}</td>
                  <td className="px-3 py-2">
                    {task.createdBy?._id === userId
                      ? "You"
                      : task.createdBy?.username}
                  </td>
                  <td className="px-3 py-2">{task.createdAt.split("T")[0]}</td>
                  <td className="px-3 py-2">
                    {task.staus ? "Completed" : "Pending"}
                  </td>
                  <td className="px-3 py-2 ">
                    {task.createdBy?._id === userId ? (
                      <>
                        <button className="p-1 border bg-blue-600 rounded shadow px-3 text-white">
                          Edit
                        </button>
                        <button className="p-1 border bg-red-600 rounded shadow px-3 text-white">
                          Delete
                        </button>
                      </>
                    ) : (
                      "Actions can be only performed by the owners"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
