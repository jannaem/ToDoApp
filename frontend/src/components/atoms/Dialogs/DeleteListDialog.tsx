import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  ThemeProvider,
} from "@material-ui/core";
import { useContext } from "react";
import SnackbarContext from "../../../contexts/SnackbarContext";
import ToDo from "../../../models/ToDo";
import ToDoListService from "../../../services/ToDoListService";
import theme from "../../../theme";
interface DialogProps {
  handleDialog: () => void;
  open: boolean;
  list: string;
  listDeleted: boolean;
  setListDeleted: () => void;
}

const DeleteListDialog = ({
  handleDialog,
  open,
  list,
  listDeleted,
  setListDeleted,
}: DialogProps) => {
  const { displaySnackbarMessage } = useContext(SnackbarContext);
  const deleteList = () => {
    ToDoListService.deleteToDoList(list)
      .then(() => {
        displaySnackbarMessage("List deleted successfully", "success");
        console.log("is this even happening");
      })
      .catch(() => displaySnackbarMessage("List deletion failed", "error"));
  };
  return (
    <ThemeProvider theme={theme}>
      <Dialog open={open} onClose={handleDialog}>
        <DialogTitle>{"Confirm delete"}</DialogTitle>
        <DialogContent>
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
          >
            cancel
          </Button>
          <Button
            autoFocus
            variant={"contained"}
            onClick={() => {
              console.log(list);
              deleteList();
              handleDialog();
              setListDeleted();
            }}
            color={"secondary"}
          >
            delete
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};
export default DeleteListDialog;
