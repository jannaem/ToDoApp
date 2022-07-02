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
import ToDoDTO from "../../models/ToDoDTO";
import ToDoListService from "../../services/ToDoListService";
import * as Yup from "yup";

interface DialogProps {
  title: string;
  text: string;
  label: string;
  handleDialog: () => void;
  open: boolean;
  userId: string;
}
const DialogForm = ({
  title,
  text,
  label,
  open,
  handleDialog,
  userId,
}: DialogProps) => {
  const createToDoList = (userId: string, name: string) => {
    const newToDoList: ToDoDTO = {
      id: "",
      name: name,
      tasks: [],
    };
    ToDoListService.createToDoList(userId, newToDoList)
      .then(() => handleDialog())
      .catch();
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
              <DialogContent>
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
                <Button onClick={handleDialog} variant="outlined">
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
export default DialogForm;
