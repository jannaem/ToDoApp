export interface Task {
  id: string;
  name: string;
  status: boolean;
}
export interface TaskDelete {
  id: number;
  name: string;
  status: boolean;
}
export default Task;
