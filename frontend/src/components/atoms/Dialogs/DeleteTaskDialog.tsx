import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@material-ui/core";
import Task from "../../../models/Task";

interface DialogProps {
  deleteAction: () => void;
  handleDialog: () => void;
  open: boolean;
  task: Task;
  taskDeleted: boolean;
  setTaskDeleted: (taskDeleted: boolean) => void;
}
const DeleteTaskDialog = ({
  open,
  handleDialog,
  task,
  taskDeleted,
  setTaskDeleted,
  deleteAction,
}: DialogProps) => {
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
            deleteAction();
            setTaskDeleted(!taskDeleted);
            handleDialog();
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
