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
import { useContext } from "react";
import SnackbarContext from "../../../contexts/SnackbarContext";
import { DialogFormValidation } from "../../Validation";

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
  const { displaySnackbarMessage } = useContext(SnackbarContext);
  const updateToDoList = (name: string) => {
    const updatedToDoList: ToDoDTO = {
      id: list.id,
      name: name,
      tasks: [],
    };
    ToDoListService.updateToDoList(list.id, updatedToDoList)
      .then(() => {
        displaySnackbarMessage("List updated successfully", "success");
        console.log("is this even happening");
      })
      .catch(() => displaySnackbarMessage("List update failed", "error"));
  };
  return (
    <Formik
      enableReinitialize
      onSubmit={() => {}}
      validationSchema={DialogFormValidation}
      initialValues={{ name: "" }}
    >
      {({ values, handleChange, resetForm, dirty, isValid, errors }) => {
        return (
          <Form method="post">
            <Dialog open={open} onClose={() => {}}>
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
                    setOpen(!open);
                  }}
                  variant="outlined"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    updateToDoList(values.name);
                    setListUpdated();
                    setOpen(false);
                    resetForm();
                  }}
                  variant="contained"
                  disabled={!isValid || !dirty}
                >
                  Update
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
