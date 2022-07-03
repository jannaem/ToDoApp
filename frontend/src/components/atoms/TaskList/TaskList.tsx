import { Grid, IconButton, List, ListItemText } from "@material-ui/core";
import ListItem from "@mui/material/ListItem";
import { Task } from "../../../models/Task";
import "../TaskList/TaskListStyle.css";
import Checkbox from "../Checkbox/Checkbox";

interface TaskListProps {
  tasks: Task[];
  taskDeleted: boolean;
  setTaskDeleted: (taskDeleted: boolean) => void;
  taskUpdated: boolean;
  setTaskUpdated: (taskUpdated: boolean) => void;
  openUpdate: boolean;
  handleUpdatedDialog: (openUpdated: boolean) => void;
  openDelete: boolean;
  handleDeletedDialog: (openDeleted: boolean) => void;
}

const TaskList = ({
  tasks,
  taskDeleted,
  setTaskDeleted,
  taskUpdated,
  setTaskUpdated,
  openUpdate,
  handleUpdatedDialog,
  openDelete,
  handleDeletedDialog,
}: TaskListProps) => {
  return (
    <List id={"tasklist"}>
      {tasks.map((task: Task) => (
        <ListItem id={"task"} disablePadding key={task.id}>
          <Grid item md={12} xs={12}>
            <Checkbox
              task={task}
              taskDeleted={taskDeleted}
              setTaskDeleted={() => setTaskDeleted}
              taskUpdated={taskUpdated}
              setTaskUpdated={() => setTaskUpdated}
              handleUpdatedDialog={handleUpdatedDialog}
              openUpdate={openUpdate}
              handleDeletedDialog={handleDeletedDialog}
              openDelete={openDelete}
            ></Checkbox>
          </Grid>
        </ListItem>
      ))}
    </List>
  );
};
export default TaskList;
