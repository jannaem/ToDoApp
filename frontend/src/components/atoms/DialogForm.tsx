import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@material-ui/core";

interface DialogProps {
  title: string;
  text: string;
  label: string;
  handleDialog: ()=>void;
  open: boolean;
}
const DialogForm = ({ title, text, label, open, handleDialog }: DialogProps) => {

  return (
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
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialog} variant="outlined">Cancel</Button>
        <Button onClick={handleDialog} variant="contained">add</Button>
      </DialogActions>
    </Dialog>
  );
};
export default DialogForm;
