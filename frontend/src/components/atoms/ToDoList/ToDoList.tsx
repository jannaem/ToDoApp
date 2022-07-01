import { IconButton, List, ListItemText } from "@material-ui/core";
import ListItem from "@mui/material/ListItem";
import { ListItemButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { ToDo } from "../../../models/ToDo";
import "./ToDoList.css";
import ToDoListService from "../../../services/ToDoListService";

interface toDoListProps {
  toDos: ToDo[];
  deleteModus: boolean;
  handleDialog: () => void;
  setDeleteToDo: (id: ToDo) => void;
  setSelectedToDo: (id: ToDo) => void;
  selectedToDo: ToDo;
}

const ToDoList = ({
  toDos,
  deleteModus,
  handleDialog,
  setDeleteToDo,
  setSelectedToDo,
  selectedToDo,
}: toDoListProps) => {
  return (
    <List id={"list"}>
      {toDos.map((toDo: ToDo) => (
        <ListItem
          disablePadding
          key={toDo.id}
          secondaryAction={
            deleteModus === true ? (
              <IconButton
                style={{ color: "#408793" }}
                edge="end"
                aria-label="delete"
                onClick={() => {
                  handleDialog();
                  setDeleteToDo(toDo);
                  ToDoListService.deleteToDoList(toDo.id);
                }}
              >
                <DeleteIcon />
              </IconButton>
            ) : null
          }
          className={selectedToDo.id === toDo.id ? "selectedToDo" : "toDo"}
        >
          <ListItemButton onClick={() => setSelectedToDo(toDo)}>
            <ListItemText primary={toDo.name} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};
export default ToDoList;
