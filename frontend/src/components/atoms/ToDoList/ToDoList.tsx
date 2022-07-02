import { IconButton, List, ListItemText } from "@material-ui/core";
import ListItem from "@mui/material/ListItem";
import { ListItemButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { ToDo } from "../../../models/ToDo";
import "./ToDoList.css";
import ToDoListService from "../../../services/ToDoListService";
import UpdateListDialog from "../Dialogs/UpdateListDialog";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";

interface toDoListProps {
  toDos: ToDo[];
  deleteModus: boolean;
  handleDialog: () => void;
  setDeleteToDo: (id: ToDo) => void;
  setSelectedToDo: (id: ToDo) => void;
  selectedToDo: ToDo;
  listUpdated: boolean;
  setListUpdated: (listUpdate: boolean) => void;
}

const ToDoList = ({
  toDos,
  deleteModus,
  handleDialog,
  setDeleteToDo,
  setSelectedToDo,
  selectedToDo,
  listUpdated,
  setListUpdated,
}: toDoListProps) => {
  const [open, setOpen] = useState(false);
  console.log(open, "updated");
  return (
    <>
      <List id={"list"}>
        {toDos.map((toDo: ToDo) => (
          <ListItem
            disablePadding
            key={toDo.id}
            secondaryAction={
              <>
                <IconButton
                  style={{ color: "#408793" }}
                  edge="end"
                  aria-label="delete"
                  onClick={() => {
                    setOpen(!open);
                    setListUpdated(!listUpdated);
                  }}
                >
                  <EditIcon />
                </IconButton>
                {deleteModus === true ? (
                  <IconButton
                    style={{ color: "#408793" }}
                    edge="end"
                    aria-label="delete"
                    onClick={() => {
                      handleDialog();
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                ) : null}
                <UpdateListDialog
                  title={"Edit ToDO list"}
                  text={"Enter the new name of the ToDO list"}
                  label={"Name"}
                  list={selectedToDo}
                  listUpdated={listUpdated}
                  setListUpdated={() => setListUpdated}
                  setOpen={setOpen}
                  open={open}
                ></UpdateListDialog>
              </>
            }
            className={selectedToDo.id === toDo.id ? "selectedToDo" : "toDo"}
          >
            <ListItemButton onClick={() => setSelectedToDo(toDo)}>
              <ListItemText primary={toDo.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  );
};
export default ToDoList;
