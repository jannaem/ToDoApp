import Button, { Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
const AddButton = () => {
  return (
    <Fab>
      Add Task
      <AddIcon />
    </Fab>
  );
};
export default AddButton;
