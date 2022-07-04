import Task from "../models/Task";

export interface ToDoDTO {
  id: string;
  name: string;
  tasks: Task[];
}
export default ToDoDTO;
