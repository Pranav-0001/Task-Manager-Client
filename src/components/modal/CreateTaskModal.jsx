import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createTaskSchema } from "../../validation/formValidationSchema.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { updateModal } from "../../redux/user/modalSlice.js";
import { createTask } from "../../api/createTask.js";
import { addTask } from "../../redux/user/TasksSlice.js";
import { emitEvent } from "../../redux/user/socketSlice.js";

export default function CreateTaskModal() {
  const dispatch = useDispatch();
  const { userId } = useSelector((state) => state.user);
  const { tasks } = useSelector((state) => state.task);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(createTaskSchema),
  });
  const onSubmitHandler = async (data) => {
    const task = await createTask(data, userId);
    dispatch(emitEvent({event:"new-task",data:task}))
    const tempTasks=[...tasks]
    tempTasks.pop()
    dispatch(addTask([task,...tempTasks]));
    dispatch(updateModal({modal:""}))
  };
  return (
    <div
      style={{ backgroundColor: "rgba(0, 0, 0, 0.51)" }}
      className="px-2 h-[100vh] w-full  fixed top-0 left-0 flex justify-center items-center"
    >
      <div className="w-full md:w-3/4 lg:w-2/5 bg-white rounded shadow-lg">
        <div className="border-b-2 py-2 px-3">
          <h1
            onClick={() => dispatch(updateModal({ modal: null }))}
            className="text-end cursor-pointer"
          >
            <FontAwesomeIcon icon={faClose} />
          </h1>
          <h1 className="text-center text-xl font-bold">Create Task</h1>
        </div>
        <div className="py-3 px-8">
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <p>Title</p>
            <input
              {...register("title")}
              type="text"
              className="border rounded px-2 py-1 outline-none w-full"
            />
            <p className="text-xs text-red-800">{errors.title?.message}</p>

            <p>Description</p>
            <textarea
              {...register("description")}
              className="border rounded px-2 py-1 outline-none w-full"
            />
            <p className="text-xs text-red-800">
              {errors.description?.message}
            </p>

            <input
              type="Submit"
              className="border bg-green-600 px-6 py-2 text-white rounded shadow"
              value="Create"
            />
          </form>
        </div>
      </div>
    </div>
  );
}
