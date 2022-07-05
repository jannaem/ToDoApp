import { Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
interface AddButtonProps {
  id: string;
  onClick: () => void;
}
const AddButton = ({ onClick, id }: AddButtonProps) => {
  return (
    <Fab
      id={id}
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
