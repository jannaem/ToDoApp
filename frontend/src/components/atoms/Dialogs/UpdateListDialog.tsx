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
import ToDo from "../../../models/ToDo";
import ToDoListService from "../../../services/ToDoListService";
import * as Yup from "yup";
import ToDoDTO from "../../../models/ToDoDTO";
import { useState } from "react";

interface DialogProps {
  title: string;
  text: string;
  label: string;
  list: ToDo;
  listUpdated: boolean;
  setListUpdated: () => void;
  setOpen: (open: boolean) => void;
  open: boolean;
}
const UpdateListDialog = ({
  title,
  text,
  label,
  list,
  listUpdated,
  setListUpdated,
  setOpen,
  open,
}: DialogProps) => {
  const updateToDoList = (name: string) => {
    const updatedToDoList: ToDoDTO = {
      id: list.id,
      name: name,
      tasks: [],
    };
    ToDoListService.updateToDoList(list.id, updatedToDoList);
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
            <Dialog open={open} onClose={() => {}}>
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
                <Button onClick={() => setOpen(!open)} variant="outlined">
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    updateToDoList(values.name);
                    setListUpdated();
                    setOpen(false);
                  }}
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
export default UpdateListDialog;
