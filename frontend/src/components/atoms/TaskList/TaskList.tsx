import { Grid, IconButton, List, ListItemText } from "@material-ui/core";
import ListItem from "@mui/material/ListItem";
import { Task } from "../../../models/Task";
import "../TaskList/TaskListStyle.css";
import Checkbox from "../Checkbox/Checkbox";

interface TaskListProps {
  tasks: Task[];
  openUpdate: boolean;
  handleUpdatedDialog: (openUpdated: boolean) => void;
  openDelete: boolean;
  handleDeletedDialog: (openDeleted: boolean) => void;
  tasksCopy: Task[];
}

const TaskList = ({
  tasks,
  openUpdate,
  handleUpdatedDialog,
  openDelete,
  handleDeletedDialog,
  tasksCopy,
}: TaskListProps) => {
  return (
    <List id={"tasklist"}>
      {tasks.map((task: Task) => (
        <ListItem id={"task"} disablePadding key={task.id}>
          <Grid item md={12} xs={12}>
            <Checkbox
              task={task}
              handleUpdatedDialog={handleUpdatedDialog}
              openUpdate={openUpdate}
              handleDeletedDialog={handleDeletedDialog}
              openDelete={openDelete}
              tasksCopy={tasksCopy}
            ></Checkbox>
          </Grid>
        </ListItem>
      ))}
    </List>
  );
};
export default TaskList;
