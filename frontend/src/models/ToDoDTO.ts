import Task from "../models/Task";

export interface ToDoTO {
  id: string;
  name: string;
  tasks: Task[];
}
export default ToDoTO;
