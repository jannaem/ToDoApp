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
import ToDoDTO from "../../../models/ToDoDTO";
import ToDoListService from "../../../services/ToDoListService";
import * as Yup from "yup";
import SnackbarContext from "../../../contexts/SnackbarContext";
import { useContext } from "react";
import theme from "../../../theme";
import "./TaskDialog.css";
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
      toDoListId: "",
      name: name,
      tasks: [],
    };
    ToDoListService.createToDoList(userId, newToDoList)
      .then(() => {
        displaySnackbarMessage("List created successfully", "success");
        handleDialog();
      })
      .catch(() => {
        displaySnackbarMessage("List creation failed", "error");
      });
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
      {({ values, handleChange, isValid, dirty, errors }) => {
        return (
          <ThemeProvider theme={theme}>
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
                    variant="outlined"
                    id="name"
                    onChange={handleChange}
                    helperText={errors.name && dirty ? errors.name : ""}
                    error={errors.name ? true : false}
                    color="secondary"
                    InputProps={{
                      classes: { notchedOutline: "specialOutline" },
                    }}
                  />
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={handleDialog}
                    variant="outlined"
                    className={"cancelButton"}
                    color="secondary"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => createToDoList(userId, values.name)}
                    variant="contained"
                    disabled={!isValid || !dirty}
                    color="secondary"
                  >
                    Add
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
export default AddListDialog;
