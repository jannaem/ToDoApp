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
import ToDo from "../../../models/ToDo";
import ToDoListService from "../../../services/ToDoListService";
import ToDoDTO from "../../../models/ToDoDTO";
import { useContext } from "react";
import SnackbarContext from "../../../contexts/SnackbarContext";
import { DialogFormValidation } from "../../Validation";
import theme from "../../../theme";
import "./TaskDialog.css";

interface DialogProps {
  title: string;
  text: string;
  label: string;
  list: ToDo;
  setOpen: () => void;
  open: boolean;
}
const UpdateListDialog = ({
  title,
  text,
  label,
  list,
  setOpen,
  open,
}: DialogProps) => {
  const { displaySnackbarMessage } = useContext(SnackbarContext);
  const updateToDoList = (name: string) => {
    const updatedToDoList: ToDoDTO = {
      toDoListId: list.toDoListId,
      name: name,
      tasks: [],
    };
    ToDoListService.updateToDoList(list.toDoListId, updatedToDoList)
      .then(() => {
        displaySnackbarMessage("List updated successfully", "success");
        setOpen();
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
          <ThemeProvider theme={theme}>
            <Form method="post">
              <Dialog open={open} onClose={() => {}}>
                <DialogTitle>{title}</DialogTitle>
                <DialogContent style={{ width: "30rem" }}>
                  <DialogContentText>{text}</DialogContentText>
                  <TextField
                    defaultValue={list.name}
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
                      setOpen();
                      resetForm();
                    }}
                    variant="outlined"
                    color="secondary"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      updateToDoList(values.name);
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
export default UpdateListDialog;
