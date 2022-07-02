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
import { List, ListItem, ListItemAvatar, Button } from "@mui/material";

import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import DeleteIcon from "@mui/icons-material/Delete";
import LogoutIcon from "@mui/icons-material/Logout";
import { useEffect, useState } from "react";
import AddListDialog from "../../atoms/Dialogs/AddListDialog";
import { ToDo } from "../../../models/ToDo";
import ToDoList from "../../atoms/ToDoList/ToDoList";
import "./ToDoPage.css";
import Task from "../../../models/Task";
import JoyrideContent from "../../atoms/JoyrideContent";
import ToDoListService from "../../../services/ToDoListService";
import TaskList from "../../atoms/TaskList/TaskList";
import SearchField from "../../atoms/SearchField";
import AddButton from "../../atoms/AddButton/AddButton";
import AddTaskDialog from "../../atoms/Dialogs/AddTaskDialog";
import JoyrideTour from "../../atoms/JoyrideTour";
import { Step } from "react-joyride";
const ToDoPage = () => {
  const [toDo, setToDo] = useState<ToDo>();
  const [lists, setLists] = useState<ToDo[]>([]);
  const [selectedToDo, setSelectedToDo] = useState<ToDo>({
    id: "1",
    name: "test",
  });
  const [taskDeleted, setTaskDeleted] = useState<boolean>(false);
  const [taskUpdated, setTaskUpdated] = useState<boolean>(false);
  const [deleteModus, setDeleteModus] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [openFormDialog, setOpenFormDialog] = useState<boolean>(false);
  const [openTaskDialog, setTaskDialog] = useState<boolean>(false);
  const [listUpdated, setListUpdated] = useState<boolean>(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filterValue, setFilterValue] = useState("");
  const [prevFilterValue, setPrevFilterValue] = useState("");
  const [runTour, setRunTour] = useState<boolean>(false);

  const userId = "3";
  const getLists = (userId: string) => {
    ToDoListService.getAllLists(userId).then((res) => {
      setLists(res);
    });
  };
  const getTasks = (listId: string) => {
    ToDoListService.getToDoList(listId).then((res) => {
      setTasks(res.tasks);
    });
  };

  const handleDeleteButton = () => {
    setDeleteModus(!deleteModus);
  };
  const handleDialog = () => {
    setOpen(!open);
  };
  const handleFormDialog = () => {
    setOpenFormDialog(!openFormDialog);
  };
  const handleTaskDialog = () => {
    setTaskDialog(!openTaskDialog);
  };
  useEffect(() => {
    console.log(lists.length);
    if (lists.length > 0) {
      setSelectedToDo(lists[0]);
      getTasks(lists[0].id);
    }
  }, [lists]);
  useEffect(() => {
    if (selectedToDo.id !== "1") {
      getTasks(selectedToDo.id.toString());
    }
  }, [selectedToDo, openTaskDialog, taskUpdated, taskDeleted]);

  useEffect(() => {
    getLists(userId);
  }, [userId, openFormDialog, open, listUpdated]);

  const joyrideSteps: Step[] = [
    {
      target: "#chooseAList",
      content: (
        <JoyrideContent
          title={"Choose a List"}
          body={
            "Here are all of your ToDo lists displayed. To add tasks, edit the name of the list or delete list you can select the list you would like to edit."
          }
        />
      ),
      placement: "auto",
      disableBeacon: true,
    },
    {
      target: "#deleteAList",
      content: <JoyrideContent title={"Step 2"} body={" "} />,
      placement: "auto",
      disableBeacon: true,
    },
    {
      target: "#addATask",
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

  return (
    <Grid container>
      {" "}
      <JoyrideTour run={runTour} setRun={setRunTour} steps={joyrideSteps} />
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
            <Typography
              component="h2"
              variant="h5"
              className={"text"}
              id={"chooseAList"}
            >
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
          listUpdated={listUpdated}
          setListUpdated={() => setListUpdated(!listUpdated)}
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
        <AddListDialog
          open={openFormDialog}
          title={"Add ToDo List"}
          text={"Enter the name of your new list"}
          label={"Name"}
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
              searchTerm={filterValue}
              setSearchTerm={(searchTerm) =>
                setFilterValue((prev) => {
                  setPrevFilterValue(prev);
                  return searchTerm;
                })
              }
            ></SearchField>
          </Grid>
          <Grid item md={3}></Grid>{" "}
          <Grid container>
            <Grid item md={12} xs={12}>
              <TaskList
                tasks={tasks}
                taskDeleted={taskDeleted}
                setTaskDeleted={setTaskDeleted}
                taskUpdated={taskUpdated}
                setTaskUpdated={setTaskUpdated}
              ></TaskList>
            </Grid>
            {lists.includes(selectedToDo) && (
              <AddButton
                onClick={() => setTaskDialog(!openTaskDialog)}
              ></AddButton>
            )}
          </Grid>
        </Grid>
      </Grid>
      <AddTaskDialog
        open={openTaskDialog}
        title={"Add Task to ToDo List"}
        text={"Enter the name of your new Task"}
        label={"Name"}
        handleDialog={handleTaskDialog}
        listId={selectedToDo.id}
      ></AddTaskDialog>
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
