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
  listUpdated: boolean;
  setListUpdated: (listUpdate: boolean) => void;
  listDeleted: boolean;
  setListDeleted: (listDeleted: boolean) => void;
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
  listDeleted,
  setListDeleted,
}: toDoListProps) => {
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
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
                        setOpen(!open);
                        setListUpdated(!listUpdated);
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
                        setOpenDelete(true);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </>
                ) : null}
                <UpdateListDialog
                  title={"Edit To DO list"}
                  text={"Enter the new name of the ToDO list"}
                  label={"Name"}
                  list={selectedList}
                  listUpdated={listUpdated}
                  setListUpdated={() => setListUpdated}
                  setOpen={setOpen}
                  open={open}
                ></UpdateListDialog>
                <DeleteListDialog
                  handleDialog={() => setOpenDelete(!openDelete)}
                  open={openDelete}
                  list={selectedList.id}
                  listDeleted={listDeleted}
                  setListDeleted={() => setListDeleted}
                ></DeleteListDialog>
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
