import { IconButton, List, ListItemText } from "@material-ui/core";
import ListItem from "@mui/material/ListItem";
import { ListItemButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { ToDo } from "../../../models/ToDo";
import "./ToDoList.css";
import UpdateListDialog from "../Dialogs/UpdateListDialog";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import DeleteListDialog from "../Dialogs/DeleteListDialog";

interface toDoListProps {
  toDos: ToDo[];
  deleteModus: boolean;
  handleDialog: () => void;
  setDeleteToDo: (id: ToDo) => void;
  setSelectedToDo: (id: ToDo) => void;
  selectedToDo: ToDo;
  openUpdate: boolean;
  handleUpdatedDialog: (openUpdated: boolean) => void;
  openDelete: boolean;
  handleDeletedDialog: (openDeleted: boolean) => void;
}

const ToDoList = ({
  toDos,
  deleteModus,
  setSelectedToDo,
  selectedToDo,
  openUpdate,
  handleDeletedDialog,
  openDelete,
  handleUpdatedDialog,
}: toDoListProps) => {
  const [selectedList, setSelectedList] = useState<ToDo>({
    id: "",
    name: "",
  });
  return (
    <>
      <List id={"list"}>
        {toDos.map((toDo: ToDo) => (
          <ListItem
            disablePadding
            key={toDo.id}
            secondaryAction={
              <>
                {deleteModus === true ? (
                  <>
                    <IconButton
                      style={{ color: "#408793" }}
                      edge="end"
                      aria-label="delete"
                      onClick={() => {
                        setSelectedList(toDo);
                        handleUpdatedDialog(true);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      style={{ color: "#408793" }}
                      edge="end"
                      aria-label="delete"
                      onClick={() => {
                        setSelectedList(toDo);
                        handleDeletedDialog(true);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </>
                ) : null}
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
      <UpdateListDialog
        title={"Edit To DO list"}
        text={"Enter the new name of the ToDO list"}
        label={"Name"}
        list={selectedList}
        setOpen={() => handleUpdatedDialog(openUpdate)}
        open={openUpdate}
      ></UpdateListDialog>
      <DeleteListDialog
        handleDialog={() => handleDeletedDialog(openDelete)}
        open={openDelete}
        list={selectedList}
      ></DeleteListDialog>
    </>
  );
};
export default ToDoList;
