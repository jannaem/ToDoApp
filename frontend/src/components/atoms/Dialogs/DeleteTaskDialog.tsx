import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  ThemeProvider,
} from "@material-ui/core";
import Task from "../../../models/Task";
import theme from "../../../theme";

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
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  );
};
export default DeleteTaskDialog;
