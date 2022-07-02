import React, { useState } from "react";
import MUICheckbox from "@material-ui/core/Checkbox";
import CircleCheckedFilled from "@material-ui/icons/CheckCircle";
import CircleUnchecked from "@material-ui/icons/RadioButtonUnchecked";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import "./CheckboxStyle.css";
import { Grid, IconButton } from "@material-ui/core";
import TaskService from "../../../services/TaskService";
import Task from "../../../models/Task";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteTaskDialog from "../Dialogs/DeleteTaskDialog";
import EditIcon from "@mui/icons-material/Edit";
import UpdateTaskDialog from "../Dialogs/UpdateTaskDialog";
import { Form, Formik } from "formik";

interface CheckBoxProps {
  task: Task;
  taskDeleted: boolean;
  setTaskDeleted: (taskDeleted: boolean) => void;
  taskUpdated: boolean;
  setTaskUpdated: (taskUpdated: boolean) => void;
}
const Checkbox = ({
  task,
  taskDeleted,
  setTaskDeleted,
  taskUpdated,
  setTaskUpdated,
}: CheckBoxProps) => {
  console.log(task, "task");
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [checked, setChecked] = useState(task.status);
  const handleChange = () => {
    setChecked(!checked);
    updateStatus();
  };
  const updateStatus = () => {
    const updatedTask: Task = {
      id: task.id,
      name: task.name,
      status: !checked,
    };
    TaskService.updateTask(task.id, updatedTask);
  };
  return (
    <>
      <Card id="card" variant="outlined">
        <CardContent>
          <Grid container>
            <Grid item xs={10} md={10}>
              <FormControlLabel
                control={
                  <MUICheckbox
                    defaultChecked={task.status}
                    icon={<CircleUnchecked />}
                    checkedIcon={<CircleCheckedFilled />}
                    checked={checked}
                    onChange={() => handleChange()}
                  />
                }
                label={
                  <Typography variant="h6" component="div">
                    {task.name}
                  </Typography>
                }
              />
            </Grid>{" "}
            <Grid item xs={1} md={1}>
              <IconButton
                style={{ color: "#408793", padding: "6px" }}
                edge="end"
                aria-label="delete"
                onClick={() => {
                  setOpenUpdateDialog(true);
                  setTaskDeleted(!taskDeleted);
                }}
              >
                <EditIcon />
              </IconButton>
            </Grid>
            <Grid item xs={1} md={1}>
              <IconButton
                style={{ color: "#408793", padding: "6px" }}
                edge="end"
                aria-label="delete"
                onClick={() => {
                  setOpenDeleteDialog(true);
                  setTaskDeleted(!taskDeleted);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <DeleteTaskDialog
        open={openDeleteDialog}
        handleDialog={() => setOpenDeleteDialog(false)}
        deleteAction={() => TaskService.deleteTask(task.id)}
        task={task}
        setTaskDeleted={() => setTaskDeleted(!taskDeleted)}
        taskDeleted={taskDeleted}
      ></DeleteTaskDialog>
      <UpdateTaskDialog
        title={"Edit task name"}
        text={"Enter the new task name"}
        label={"Name"}
        handleDialog={() => setOpenUpdateDialog(false)}
        open={openUpdateDialog}
        task={task}
        taskUpdated={taskUpdated}
        setTaskUpdated={() => setTaskUpdated(!taskUpdated)}
      ></UpdateTaskDialog>
    </>
  );
};

export default Checkbox;
