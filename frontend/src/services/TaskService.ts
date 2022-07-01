import api from "../services/ApiService";
import Task from "../models/Task";
const TaskService = {
  getTask: async (taskId: string): Promise<Task> => {
    const { data } = await api.get(`/task/${taskId}`);
    return data;
  },
  updateTask: async (taskId: string, task: Task): Promise<Task> => {
    const { data } = await api.update(`/task/${taskId}`, task);
    return data;
  },
  deleteTask: async (taskId: string) => {
    api.delete(`/task/${taskId}`);
  },
  createTask: async (listId: string, task: Task): Promise<Task> => {
    const { data } = await api.post(`/task/${listId}`, task);
    return data;
  },
};
export default TaskService;
