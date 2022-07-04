import { Avatar, Card, Grid, Typography } from "@material-ui/core";
import { List, ListItem, ListItemAvatar, Button } from "@mui/material";

import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import DeleteIcon from "@mui/icons-material/Delete";
import LogoutIcon from "@mui/icons-material/Logout";
import { useContext, useEffect, useState } from "react";
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
import SnackbarContext from "../../../contexts/SnackbarContext";
import ApiService from "../../../services/ApiService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthenticationContext";
const ToDoPage = () => {
  const navigation = useNavigate();
  const { logout } = useAuth();
  const [toDo, setToDo] = useState<ToDo>();
  const [lists, setLists] = useState<ToDo[]>([]);
  const [selectedToDo, setSelectedToDo] = useState<ToDo>({
    id: "1234",
    name: "default",
  });
  const [deleteModus, setDeleteModus] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [openFormDialog, setOpenFormDialog] = useState<boolean>(false);
  const [openTaskDialog, setTaskDialog] = useState<boolean>(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filterValue, setFilterValue] = useState("");
  const [prevFilterValue, setPrevFilterValue] = useState("");
  const [runTour, setRunTour] = useState<boolean>(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [openDeleteListDialog, setOpenDeleteListDialog] = useState(false);
  const [openUpdateListDialog, setOpenUpdateListDialog] = useState(false);

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
  const handleDeleteTask = () => {
    setOpenDeleteDialog(!openDeleteDialog);
  };
  const handleUpdateTask = () => {
    setOpenUpdateDialog(!openUpdateDialog);
  };
  const handleDeleteList = () => {
    setOpenDeleteListDialog(!openDeleteListDialog);
  };
  const handleUpdateList = () => {
    setOpenUpdateListDialog(!openUpdateListDialog);
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
    if (selectedToDo.id !== "1234") {
      getTasks(selectedToDo.id.toString());
    }
  }, [selectedToDo, openTaskDialog, openUpdateDialog, openDeleteDialog]);

  useEffect(() => {
    getLists(userId);
    if (
      (lists.length > 0 && selectedToDo.name === "default") ||
      lists.length === 1
    ) {
      setSelectedToDo(lists[0]);
      getTasks(lists[0].id);
    }
  }, [userId, openFormDialog, open]);

  useEffect(() => {
    getLists(userId);
  }, [openUpdateListDialog, openDeleteListDialog]);

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
      <JoyrideTour run={runTour} setRun={setRunTour} steps={joyrideSteps} />
      <Grid item md={5} xs={12} direction={"column"}>
        <List>
          <Card id={"logOutCard"}>
            <ListItem disablePadding>
              <ListItem
                disablePadding
                secondaryAction={
                  <Button
                    variant="contained"
                    endIcon={<LogoutIcon />}
                    onClick={() => {
                      logout();
                      navigation("/");
                    }}
                  >
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
                  edit modus
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
              To Do Lists
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
          handleUpdatedDialog={handleUpdateList}
          openUpdate={openUpdateListDialog}
          handleDeletedDialog={handleDeleteList}
          openDelete={openDeleteListDialog}
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
                handleUpdatedDialog={handleUpdateTask}
                openUpdate={openUpdateDialog}
                handleDeletedDialog={handleDeleteTask}
                openDelete={openDeleteDialog}
              ></TaskList>
            </Grid>
            {selectedToDo.id !== "1234" && (
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
    </Grid>
  );
};
export default ToDoPage;
