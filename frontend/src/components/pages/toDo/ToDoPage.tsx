import {
  Avatar,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Typography,
} from "@material-ui/core";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import DeleteIcon from "@mui/icons-material/Delete";
import LogoutIcon from "@mui/icons-material/Logout";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import DialogForm from "../../atoms/DialogForm";
import { ToDo } from "../../../models/ToDo";
import ToDoList from "../../atoms/ToDoList/ToDoList";
import "./ToDoPage.css";
import Task from "../../../models/Task";
import JoyrideContent from "../../atoms/JoyrideContent";
import ToDoListService from "../../../services/ToDoListService";
import TaskList from "../../atoms/TaskList/TaskList";
import SearchField from "../../atoms/SearchField";
import ToDoDTO from "../../../models/ToDoDTO";
import AddButton from "../../atoms/AddButton/AddButton";
const ToDoPage = () => {
  const [toDo, setToDo] = useState<ToDo>();
  const [selectedToDo, setSelectedToDo] = useState<ToDo>({
    id: 1,
    name: "test",
  });
  const [selectedTask, setSelectedTask] = useState<Task>();
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
          Add ToDo list
        </Button>
        <DialogForm
          open={openFormDialog}
          title={"Add ToDo List"}
          text={"Enter the name of your new ToDo List"}
          label={"Name of ToDo List"}
          handleDialog={handleFormDialog}
          userId={userId}
        />
      </Grid>
      <Grid item md={7} xs={12} direction={"column"} id={"toDo"}>
        <Grid container direction="row" id={"taskContainer"}>
          <Grid container></Grid>
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
          <Grid item md={4}>
            <SearchField
              id={""}
              variant={"standard"}
              type={""}
              placeholder={"Enter task name..."}
              margin={"none"}
              label={""}
              disabled={false}
              name={""}
              searchTerm={""}
              setSearchTerm={function (string: string): void {
                throw new Error("Function not implemented.");
              }}
            ></SearchField>
          </Grid>
          <Grid item md={3}></Grid>{" "}
          <Grid container>
            <Grid item md={12} xs={12}>
              <TaskList
                tasks={tasks}
                deleteModus={deleteModus}
                handleDialog={handleDialog}
                setDeleteToDo={(deleteTD: Task) => {
                  setToDo(deleteTD);
                }}
                setSelectedToDo={(selectedTD: Task) => {
                  setSelectedToDo(selectedTD);
                }}
              ></TaskList>
            </Grid>
            <AddButton></AddButton>
          </Grid>
        </Grid>
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
    </Grid>
  );
};
export default ToDoPage;
