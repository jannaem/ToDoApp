import { Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
interface AddButtonProps {
  onClick: () => void;
}
const AddButton = ({ onClick }: AddButtonProps) => {
  return (
    <Fab
      id="Button"
      style={{
        background: "#69CABC",
        width: "100%",
        color: "#ffffff",
        boxShadow: "none",
        marginTop: "1rem",
      }}
      variant="extended"
      onClick={onClick}
    >
      <AddIcon />
      Add Task
    </Fab>
  );
};
export default AddButton;
