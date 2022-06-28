import { Grid, IconButton, List, ListItemText } from "@material-ui/core";
import ListItem from "@mui/material/ListItem";
import { ListItemButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Task } from "../../../models/Task";
import "../TaskList/TaskListStyle.css";
import Checkbox from "../Checkbox/Checkbox";

interface TaskListProps {
  tasks: Task[];
  deleteModus: boolean;
  handleDialog: () => void;
  setDeleteToDo: (id: Task) => void;
  setSelectedToDo: (id: Task) => void;
  selectedTask?: Task;
}

const TaskList = ({
  tasks,
  deleteModus,
  handleDialog,
  setDeleteToDo,
  setSelectedToDo,
}: TaskListProps) => {
  return (
    <List id={"tasklist"}>
      {tasks.map((task: Task) => (
        <ListItem
          id={"task"}
          disablePadding
          key={task.id}
          secondaryAction={
            deleteModus === true ? (
              <IconButton
                style={{ color: "#408793" }}
                edge="end"
                aria-label="delete"
                onClick={() => {
                  handleDialog();
                  setDeleteToDo(task);
                }}
              >
                <DeleteIcon />
              </IconButton>
            ) : null
          }
        >
          <ListItemButton
            onClick={() => setSelectedToDo(task)}
          ></ListItemButton>
          <Grid item md={12} xs={12}>
            <Checkbox text={task.name} status={task.status}></Checkbox>
          </Grid>
        </ListItem>
      ))}
    </List>
  );
};
export default TaskList;
