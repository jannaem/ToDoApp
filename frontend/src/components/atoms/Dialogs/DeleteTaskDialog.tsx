import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@material-ui/core";
import Task from "../../../models/Task";
import TaskService from "../../../services/TaskService";
import SnackbarContext from "../../../contexts/SnackbarContext";
import { useContext } from "react";

interface DialogProps {
  handleDialog: () => void;
  open: boolean;
  task: Task;
}
const DeleteTaskDialog = ({ open, handleDialog, task }: DialogProps) => {
  const { displaySnackbarMessage } = useContext(SnackbarContext);
  const deleteTask = () => {
    TaskService.deleteTask(task.id)
      .then(() => {
        displaySnackbarMessage("Task deleted successfully", "success");
        handleDialog();
      })
      .catch(() => displaySnackbarMessage("Task deletion failed", "error"));
  };
  return (
    <Dialog open={open} onClose={handleDialog}>
      <DialogTitle>{"Confirm delete"}</DialogTitle>
      <DialogContent style={{ width: "30rem" }}>
        <DialogContentText>
          {"Are you sure you want to delete the to do list: "}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          variant={"outlined"}
          onClick={handleDialog}
          color={"secondary"}
          disabled={false}
        >
          cancel
        </Button>
        <Button
          autoFocus
          variant={"contained"}
          onClick={() => {
            deleteTask();
          }}
          color={"secondary"}
          disabled={false}
        >
          delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default DeleteTaskDialog;
