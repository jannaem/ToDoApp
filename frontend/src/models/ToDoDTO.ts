import Task from "../models/Task";

export interface ToDo {
  id: string;
  name: string;
  tasks: Task[];
}
export default ToDo;
