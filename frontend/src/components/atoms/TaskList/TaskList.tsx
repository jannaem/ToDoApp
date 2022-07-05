import {
  Grid,
  IconButton,
  List,
  ListItemText,
  Typography,
} from "@material-ui/core";
import ListItem from "@mui/material/ListItem";
import { Task } from "../../../models/Task";
import "../TaskList/TaskListStyle.css";
import Checkbox from "../Checkbox/Checkbox";
import AssignmentIcon from "@mui/icons-material/Assignment";

interface TaskListProps {
  tasks: Task[];
  openUpdate: boolean;
  handleUpdatedDialog: (openUpdated: boolean) => void;
  openDelete: boolean;
  handleDeletedDialog: (openDeleted: boolean) => void;
}

const TaskList = ({
  tasks,
  openUpdate,
  handleUpdatedDialog,
  openDelete,
  handleDeletedDialog,
}: TaskListProps) => {
  return (
    <List id={"tasklist"}>
      <>
        {tasks.length < 1 && (
          <>
            <AssignmentIcon
              color="primary"
              fontSize="large"
              className={"svg_icons"}
            ></AssignmentIcon>
            <Typography align="center" style={{ margin: "2rem" }}>
              No tasks created yet.
            </Typography>
          </>
        )}
        {tasks.map((task: Task) => (
          <ListItem id={"task"} disablePadding key={task.id}>
            <Grid item md={12} xs={12}>
              <Checkbox
                task={task}
                handleUpdatedDialog={handleUpdatedDialog}
                openUpdate={openUpdate}
                handleDeletedDialog={handleDeletedDialog}
                openDelete={openDelete}
              ></Checkbox>
            </Grid>
          </ListItem>
        ))}
      </>
    </List>
  );
};
export default TaskList;
