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
import { Form, Formik, yupToFormErrors } from "formik";
import { useContext } from "react";
import * as Yup from "yup";
import SnackbarContext from "../../../contexts/SnackbarContext";
import Task from "../../../models/Task";
import TaskService from "../../../services/TaskService";

interface DialogProps {
  title: string;
  text: string;
  label: string;
  handleDialog: () => void;
  open: boolean;
  listId: string;
}
const AddTaskDialog = ({
  title,
  text,
  label,
  open,
  handleDialog,
  listId,
}: DialogProps) => {
  const { displaySnackbarMessage } = useContext(SnackbarContext);
  const createTask = (listId: string, name: string) => {
    const newTask: Task = {
      id: "",
      name: name,
      status: false,
    };
    TaskService.createTask(listId, newTask)
      .then(() => {
        displaySnackbarMessage("Task created successfully", "success");
        console.log("is this even happening");
        handleDialog();
      })
      .catch(() => displaySnackbarMessage("Task creation failed", "error"));
  };
  const classes = createTheme();
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
                      createTask(listId, values.name);
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
export default AddTaskDialog;
