import { Grid, IconButton, List, ListItemText } from "@material-ui/core";
import ListItem from "@mui/material/ListItem";
import { Task } from "../../../models/Task";
import "../TaskList/TaskListStyle.css";
import Checkbox from "../Checkbox/Checkbox";

interface TaskListProps {
  tasks: Task[];
  handleDialog: () => void;
  taskDeleted: boolean;
  setTaskDeleted: (taskDeleted: boolean) => void;
}

const TaskList = ({
  tasks,
  handleDialog,
  taskDeleted,
  setTaskDeleted,
}: TaskListProps) => {
  return (
    <List id={"tasklist"}>
      {tasks.map((task: Task) => (
        <ListItem id={"task"} disablePadding key={task.id}>
          <Grid item md={12} xs={12}>
            <Checkbox
              task={task}
              handleDialog={handleDialog}
              taskDeleted={taskDeleted}
              setTaskDeleted={setTaskDeleted}
            ></Checkbox>
          </Grid>
        </ListItem>
      ))}
    </List>
  );
};
export default TaskList;
