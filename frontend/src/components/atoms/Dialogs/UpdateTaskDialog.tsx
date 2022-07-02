import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import { createTheme } from "@mui/material";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import Task from "../../../models/Task";
import TaskService from "../../../services/TaskService";
import "./TaskDialog.css";

interface DialogProps {
  title: string;
  text: string;
  label: string;
  handleDialog: () => void;
  open: boolean;
  task: Task;
  taskUpdated: boolean;
  setTaskUpdated: () => void;
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
  const updateTask = (task: Task, name: string) => {
    const updatedTask: Task = {
      id: task.id,
      name: name,
      status: task.status,
    };
    TaskService.updateTask(task.id, updatedTask)
      .then(() => handleDialog())
      .catch();
  };
  const classes = createTheme();
  console.log(open, "open");
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .trim()
      .required("A name needs to be entered")
      .min(2, "The task name has to be at least 2 characters long")
      .max(25, "test"),
  });

  return (
    <Formik
      enableReinitialize
      onSubmit={() => {}}
      validationSchema={validationSchema}
      initialValues={{ name: "o", status: false }}
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
                      setTaskUpdated();
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
