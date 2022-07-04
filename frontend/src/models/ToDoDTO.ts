import Task from "../models/Task";

export interface ToDoTO {
  toDoListId: string;
  name: string;
  tasks: Task[];
}
export default ToDoTO;
