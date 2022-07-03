import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import { Form, Formik, yupToFormErrors } from "formik";
import ToDoDTO from "../../../models/ToDoDTO";
import ToDoListService from "../../../services/ToDoListService";
import * as Yup from "yup";
import SnackbarContext from "../../../contexts/SnackbarContext";
import { useContext, useEffect, useState } from "react";
interface DialogProps {
  title: string;
  text: string;
  label: string;
  handleDialog: () => void;
  open: boolean;
  userId: string;
}
const AddListDialog = ({
  title,
  text,
  label,
  open,
  handleDialog,
  userId,
}: DialogProps) => {
  const { displaySnackbarMessage } = useContext(SnackbarContext);
  const createToDoList = (userId: string, name: string) => {
    const newToDoList: ToDoDTO = {
      id: "",
      name: name,
      tasks: [],
    };
    ToDoListService.createToDoList(userId, newToDoList)
      .then(() => {
        displaySnackbarMessage("List created successfully", "success");
        console.log("is this even happening");
        handleDialog();
      })
      .catch(() => displaySnackbarMessage("List creation failed", "error"));
  };
  const validationSchema = () => {
    Yup.object().shape({
      name: Yup.string()
        .trim()
        .required()
        .min(2, "The task name has to be at least 2 characters long")
        .max(25, "test"),
    });
  };
  return (
    <Formik
      enableReinitialize
      onSubmit={() => {}}
      validationSchema={validationSchema}
      initialValues={{ name: "" }}
    >
      {({ values, handleChange, isValid, dirty }) => {
        return (
          <Form method="post">
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
                />
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={handleDialog}
                  variant="outlined"
                  className={"cancelButton"}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => createToDoList(userId, values.name)}
                  variant="contained"
                  disabled={!isValid || !dirty}
                >
                  Add
                </Button>
              </DialogActions>
            </Dialog>
          </Form>
        );
      }}
    </Formik>
  );
};
export default AddListDialog;
