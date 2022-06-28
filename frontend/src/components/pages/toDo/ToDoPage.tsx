import {
  Avatar,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { ListItemButton } from "@mui/material";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import DeleteIcon from "@mui/icons-material/Delete";
import LogoutIcon from "@mui/icons-material/Logout";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import DialogForm from "../../atoms/DialogForm";
import { ToDo } from "../../../models/ToDo";
import ToDoList from "../../atoms/ToDoList/ToDoList";
import "./ToDoPage.css";
import Checkbox from "../../atoms/Checkbox";
import Task from "../../../models/Task";
import JoyrideContent from "../../atoms/JoyrideContent";
import ToDoListService from "../../../services/ToDoListService";
const ToDoPage = () => {
  const [toDo, setToDo] = useState<ToDo>();
  const [selectedToDo, setSelectedToDo] = useState<ToDo>({
    id: 1,
    name: "test",
  });
  const [deleteModus, setDeleteModus] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [openFormDialog, setOpenFormDialog] = useState<boolean>(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [lists, setLists] = useState<ToDo[]>([]);
  const userId = "3";

  const getTasks = (listId: string) => {
    ToDoListService.getToDoList(listId).then((res) => {
      setTasks(res.tasks);
    });
  };
  const getLists = (userId: string) => {
    ToDoListService.getAllLists(userId).then((res) => {
      setLists(res);
    });
  };
  useEffect(() => {
    getTasks(selectedToDo.id.toString());
    console.log(tasks);
  }, [selectedToDo]);

  useEffect(() => {
    getLists(userId);
    console.log(lists);
  }, [userId]);

  const steps = [
    {
      target: "#userDetailsSheet",
      content: <JoyrideContent title={"Step 1"} body={" "} />,
      placement: "auto",
      disableBeacon: true,
    },
    {
      target: "#userGroupsTable",
      content: <JoyrideContent title={"Step 2"} body={" "} />,
      placement: "auto",
      disableBeacon: true,
    },
    {
      target: "#userCoursesTable",
      content: <JoyrideContent title={"Step 3"} body={" "} />,
      placement: "auto",
      disableBeacon: true,
    },
    {
      target: "#tableSearchField",
      content: <JoyrideContent title={"Step 4"} body={" "} />,
      placement: "auto",
      disableBeacon: true,
    },
  ];
  const handleDeleteButton = () => {
    setDeleteModus(!deleteModus);
  };
  const handleDialog = () => {
    setOpen(!open);
  };
  const handleFormDialog = () => {
    setOpenFormDialog(!openFormDialog);
  };
  return (
    <Grid container>
      <Grid item md={5} xs={12} direction={"column"}>
        <List>
          <Card id={"logOutCard"}>
            <ListItem disablePadding>
              <ListItem
                disablePadding
                secondaryAction={
                  <Button variant="contained" endIcon={<LogoutIcon />}>
                    logout
                  </Button>
                }
              >
                <ListItemAvatar>
                  <Avatar id={"avatar"}>UN</Avatar>
                </ListItemAvatar>
                <Typography component="h1" variant="h5" className={"text"}>
                  dfgdsfsg
                </Typography>
              </ListItem>
            </ListItem>
          </Card>
          <ListItem
            secondaryAction={
              deleteModus === false ? (
                <Button
                  variant="outlined"
                  color="secondary"
                  endIcon={<DeleteIcon />}
                  onClick={handleDeleteButton}
                >
                  delete list
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleDeleteButton}
                >
                  cancel
                </Button>
              )
            }
          >
            <Typography component="h2" variant="h5" className={"text"}>
              ToDo Lists
            </Typography>
          </ListItem>
        </List>
        <ToDoList
          toDos={lists}
          deleteModus={deleteModus}
          handleDialog={handleDialog}
          setDeleteToDo={(deleteTD: ToDo) => {
            setToDo(deleteTD);
          }}
          setSelectedToDo={(selectedTD: ToDo) => {
            setSelectedToDo(selectedTD);
          }}
          selectedToDo={selectedToDo}
        />
        <Button
          color={"primary"}
          variant={"contained"}
          className={"button"}
          fullWidth
          startIcon={<PlaylistAddIcon />}
          onClick={handleFormDialog}
        >
          add to do list
        </Button>
        <DialogForm
          open={openFormDialog}
          title={"Add to do list"}
          text={"Write the name done of your to do list"}
          label={"Name of to do list"}
          handleDialog={handleFormDialog}
        />
      </Grid>
      <Grid item md={7} xs={12} direction={"column"} id={"toDo"}>
        <Grid container direction="row" id={"taskContainer"}>
          <Grid item md={8}>
            <Typography
              component="h1"
              align={"left"}
              variant="h3"
              className={"text"}
            >
              Todo{" "}
            </Typography>
          </Grid>
          <Grid item md={3}></Grid>{" "}
          <Grid item md={8}>
            <>
              {console.log(tasks)}
              {tasks &&
                tasks.forEach((task) => {
                  <Checkbox text={task.name} status={task.status}></Checkbox>;
                })}
            </>
          </Grid>
        </Grid>
        {" test"}
      </Grid>
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
            onClick={handleDialog}
            color={"secondary"}
          >
            delete
          </Button>
        </DialogActions>
      </Dialog>
      <Checkbox text="test"></Checkbox>
    </Grid>
  );
};
export default ToDoPage;
