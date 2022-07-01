import React from "react";
import MUICheckbox from "@material-ui/core/Checkbox";
import CircleCheckedFilled from "@material-ui/icons/CheckCircle";
import CircleUnchecked from "@material-ui/icons/RadioButtonUnchecked";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import "./CheckboxStyle.css";
import { IconButton } from "@material-ui/core";
import TaskService from "../../../services/TaskService";
import Task from "../../../models/Task";
import DeleteIcon from "@mui/icons-material/Delete";

interface CheckBoxProps {
  task: Task;
  handleDialog: () => void;
  taskDeleted: boolean;
  setTaskDeleted: (taskDeleted: boolean) => void;
}
const Checkbox = ({
  task,
  handleDialog,
  taskDeleted,
  setTaskDeleted,
}: CheckBoxProps) => {
  console.log(task, "task");

  return (
    <Card id="card" variant="outlined">
      <CardContent>
        <FormControlLabel
          control={
            <MUICheckbox
              defaultChecked={task.status}
              icon={<CircleUnchecked />}
              checkedIcon={<CircleCheckedFilled />}
            />
          }
          label={
            <Typography variant="h6" component="div">
              {task.name}
            </Typography>
          }
        />
        <IconButton
          style={{ color: "#408793" }}
          edge="end"
          aria-label="delete"
          onClick={() => {
            handleDialog();
            setTaskDeleted(!taskDeleted);
            TaskService.deleteTask(task.id);
          }}
        >
          <DeleteIcon />
        </IconButton>
      </CardContent>
    </Card>
  );
};

export default Checkbox;
