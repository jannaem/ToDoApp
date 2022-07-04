import React, { useContext, useState } from "react";
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
import SnackbarContext from "../../../contexts/SnackbarContext";

interface CheckBoxProps {
  task: Task;
  openUpdate: boolean;
  handleUpdatedDialog: (openUpdated: boolean) => void;
  openDelete: boolean;
  handleDeletedDialog: (openDeleted: boolean) => void;
  tasksCopy: Task[];
}
const Checkbox = ({
  task,
  openUpdate,
  handleUpdatedDialog,
  openDelete,
  handleDeletedDialog,
  tasksCopy,
}: CheckBoxProps) => {
  const [checked, setChecked] = useState(task.status);
  const handleChange = () => {
    setChecked(!checked);
    updateStatus();
  };
  const { displaySnackbarMessage } = useContext(SnackbarContext);
  const updateStatus = () => {
    const updatedTask: Task = {
      id: task.id,
      name: task.name,
      status: !checked,
    };
    TaskService.updateTask(task.id, updatedTask)
      .then(() => {
        displaySnackbarMessage("Task updated successfully", "success");
        console.log("is this even happening");
      })
      .catch(() => displaySnackbarMessage("Task update failed", "error"));
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
                  handleUpdatedDialog(true);
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
                  handleDeletedDialog(true);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <DeleteTaskDialog
        open={openDelete}
        handleDialog={() => handleDeletedDialog(openDelete)}
        task={task}
        tasksCopy={tasksCopy}
      ></DeleteTaskDialog>
      <UpdateTaskDialog
        title={"Edit task name"}
        text={"Enter the new task name"}
        label={"Name"}
        handleDialog={() => handleUpdatedDialog(openUpdate)}
        open={openUpdate}
        task={task}
      ></UpdateTaskDialog>
    </>
  );
};

export default Checkbox;
