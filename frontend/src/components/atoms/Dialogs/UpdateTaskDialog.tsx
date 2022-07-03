import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import { Form, Formik } from "formik";
import { useContext } from "react";
import * as Yup from "yup";
import SnackbarContext from "../../../contexts/SnackbarContext";
import Task from "../../../models/Task";
import TaskService from "../../../services/TaskService";
import { DialogFormValidation } from "../../Validation";
import "./TaskDialog.css";

interface DialogProps {
  title: string;
  text: string;
  label: string;
  handleDialog: () => void;
  open: boolean;
  task: Task;
  taskUpdated: boolean;
  setTaskUpdated: (taskUpdated: boolean) => void;
}
const UpdateTaskDialog = ({
  title,
  text,
  label,
  open,
  handleDialog,
  task,
  taskUpdated,
  setTaskUpdated,
}: DialogProps) => {
  const { displaySnackbarMessage } = useContext(SnackbarContext);
  const updateTask = (task: Task, name: string) => {
    const updatedTask: Task = {
      id: task.id,
      name: name,
      status: task.status,
    };
    TaskService.updateTask(task.id, updatedTask)
      .then(() => {
        displaySnackbarMessage("Task updated successfully", "success");
        handleDialog();
      })
      .catch(() => displaySnackbarMessage("Task update failed", "error"));
  };

  return (
    <Formik
      enableReinitialize
      onSubmit={() => {}}
      validationSchema={DialogFormValidation}
      initialValues={{ name: "", status: false }}
    >
      {({ values, handleChange, isValid, dirty, resetForm, errors }) => {
        return (
          <Form method="post">
            <>
              <Dialog open={open} onClose={handleDialog}>
                <DialogTitle>{title}</DialogTitle>
                <DialogContent style={{ width: "30rem" }}>
                  <DialogContentText>{text}</DialogContentText>
                  <TextField
                    required
                    autoFocus
                    margin="dense"
                    label={label}
                    type="text"
                    fullWidth
                    variant="standard"
                    id="name"
                    onChange={handleChange}
                    helperText={errors.name && dirty ? errors.name : ""}
                    error={errors.name ? true : false}
                  />
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={() => {
                      resetForm();
                      handleDialog();
                    }}
                    variant="outlined"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      updateTask(task, values.name);
                      setTaskUpdated(!taskUpdated);
                      resetForm();
                    }}
                    variant="contained"
                    disabled={!isValid || !dirty}
                  >
                    Add
                  </Button>
                </DialogActions>
              </Dialog>
            </>
          </Form>
        );
      }}
    </Formik>
  );
};
export default UpdateTaskDialog;
