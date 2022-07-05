import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  ThemeProvider,
} from "@material-ui/core";
import { Form, Formik } from "formik";
import { useContext } from "react";
import SnackbarContext from "../../../contexts/SnackbarContext";
import Task from "../../../models/Task";
import TaskService from "../../../services/TaskService";
import theme from "../../../theme";
import { DialogFormValidation } from "../../Validation";
import "./TaskDialog.css";

interface DialogProps {
  title: string;
  text: string;
  label: string;
  handleDialog: () => void;
  open: boolean;
  task: Task;
}
const UpdateTaskDialog = ({
  title,
  text,
  label,
  open,
  handleDialog,
  task,
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
  console.log(task, "task");
  return (
    <Formik
      enableReinitialize
      onSubmit={() => {}}
      validationSchema={DialogFormValidation}
      initialValues={{ name: "", status: false }}
    >
      {({ values, handleChange, isValid, dirty, resetForm, errors }) => {
        return (
          <ThemeProvider theme={theme}>
            <Form method="post">
              <Dialog open={open} onClose={handleDialog}>
                <DialogTitle>{title}</DialogTitle>
                <DialogContent style={{ width: "30rem" }}>
                  <DialogContentText>{text}</DialogContentText>
                  <TextField
                    defaultValue={task.name}
                    required
                    autoFocus
                    margin="dense"
                    label={label}
                    type="text"
                    fullWidth
                    variant="outlined"
                    id="name"
                    onChange={handleChange}
                    helperText={errors.name && dirty ? errors.name : ""}
                    error={errors.name ? true : false}
                    InputProps={{
                      classes: { notchedOutline: "specialOutline" },
                    }}
                  />
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={() => {
                      resetForm();
                      handleDialog();
                    }}
                    variant="outlined"
                    color="secondary"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      updateTask(task, values.name);
                      resetForm();
                    }}
                    variant="contained"
                    disabled={!isValid || !dirty}
                    color="secondary"
                  >
                    Update
                  </Button>
                </DialogActions>
              </Dialog>
            </Form>
          </ThemeProvider>
        );
      }}
    </Formik>
  );
};
export default UpdateTaskDialog;
