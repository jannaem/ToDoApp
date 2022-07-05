import Task from "../models/Task";

export interface ToDoDTO {
  toDoListId: string;
  name: string;
  tasks: Task[];
}
export default ToDoDTO;
