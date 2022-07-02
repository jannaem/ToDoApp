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
import DeleteTaskDialog from "../TaskDialog/DeleteTaskDialog";

interface CheckBoxProps {
  task: Task;
  taskDeleted: boolean;
  setTaskDeleted: (taskDeleted: boolean) => void;
}
const Checkbox = ({ task, taskDeleted, setTaskDeleted }: CheckBoxProps) => {
  console.log(task, "task");
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <>
      <Card id="card" variant="outlined">
        <CardContent>
          <Grid container>
            <Grid item xs={11} md={11}>
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
            </Grid>
            <Grid item xs={1} md={1}>
              <IconButton
                style={{ color: "#408793" }}
                edge="end"
                aria-label="delete"
                onClick={() => {
                  setOpenDialog(true);
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
        open={openDialog}
        handleDialog={() => setOpenDialog(false)}
        deleteAction={() => TaskService.deleteTask(task.id)}
        task={task}
        setTaskDeleted={() => setTaskDeleted(!taskDeleted)}
        taskDeleted={taskDeleted}
      ></DeleteTaskDialog>
    </>
  );
};

export default Checkbox;
