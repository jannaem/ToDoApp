import api from "../services/ApiService";
import ToDo from "../models/ToDo";
import ToDoDTO from "../models/ToDoDTO";
const ToDoListService = {
  getToDoList: async (listId: string): Promise<ToDoDTO> => {
    const { data } = await api.get(`/list/${listId}`);
    return data;
  },
  updateToDoList: async (listId: string, toDoList: ToDoDTO): Promise<ToDo> => {
    const { data } = await api.update(`/list/${listId}`, toDoList);
    return data;
  },
  deleteToDoList: async (listId: string) => {
    api.delete(`/list/${listId}`);
  },
  createToDoList: async (userId: string, toDoList: ToDoDTO): Promise<ToDo> => {
    const { data } = await api.post(`/list/${userId}`, toDoList);
    return data;
  },
  getAllLists: async (userId: string): Promise<ToDo[]> => {
    const { data } = await api.get(`/list/user/${userId}`);
    return data;
  },
};
export default ToDoListService;
