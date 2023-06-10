import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import customFetch from "./utils";
import { toast } from "react-toastify";

//fetch all data from server
export const useFetchTasks = () => {
  const { isLoading, data, isError, error } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => customFetch.get("/"),
  });
  return { isLoading, isError, data, error };
};

//create task on server
export const useCreateTask = () => {
  const queryClient = useQueryClient();

  const { mutate: createTask, isLoading } = useMutation({
    mutationFn: (taskTitle) => customFetch.post("/", { title: taskTitle }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("task added");
    },
    onError: (error) => {
      toast.error(error.response.data.msg);
    },
  });
  return { createTask, isLoading };
};

//edit the created task on server
export const useEditTask = () => {
  const queryClient = useQueryClient();
  const { mutate: editTask } = useMutation({
    mutationFn: ({ taskId, isDone }) => {
      return customFetch.patch(`${taskId}`, { isDone });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
  return { editTask };
};

//delete the task created on server
export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteTask, isLoading } = useMutation({
    mutationFn: ({ taskId }) => {
      return customFetch.delete(`${taskId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
  return { deleteTask, isLoading };
};
