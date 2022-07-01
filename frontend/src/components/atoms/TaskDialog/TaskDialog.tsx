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
import * as Yup from "yup";
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
const TaskDialog = ({
  title,
  text,
  label,
  open,
  handleDialog,
  listId,
}: DialogProps) => {
  const createTask = (listId: string, name: string) => {
    const newTask: Task = {
      id: "",
      name: name,
      status: false,
    };
    TaskService.createTask(listId, newTask)
      .then(() => handleDialog())
      .catch();
  };
  const validationSchema = () => {
    Yup.object().shape({ name: Yup.string().trim().required() });
  };
  return (
    <Formik
      enableReinitialize
      onSubmit={() => {}}
      validationSchema={validationSchema}
      initialValues={{ name: "" }}
    >
      {({ values, handleChange }) => {
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
                <Button onClick={() => handleDialog()} variant="outlined">
                  Cancel
                </Button>
                <Button
                  onClick={() => createTask(listId, values.name)}
                  variant="contained"
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
export default TaskDialog;
