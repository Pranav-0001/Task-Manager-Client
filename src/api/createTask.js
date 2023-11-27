import { api } from "./axiosInstance";

export const createTask = async ({title,description},userId) => {
  try {
    const { data } = await api.post("/task/create", {
      title,
      description,
      createdBy:userId,
    });
    return data.task
   return 

  } catch (error) {}
};
