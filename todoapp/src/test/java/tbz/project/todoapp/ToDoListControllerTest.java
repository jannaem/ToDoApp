package tbz.project.todoapp;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;

import com.fasterxml.jackson.databind.ObjectMapper;
import javax.transaction.Transactional;

import org.json.JSONArray;
import org.json.JSONObject;
import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.skyscreamer.jsonassert.JSONAssert;
import org.skyscreamer.jsonassert.JSONCompareMode;
import org.skyscreamer.jsonassert.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import tbz.project.todoapp.role.Role;
import tbz.project.todoapp.task.TaskRepository;
import tbz.project.todoapp.task.TaskService;
import tbz.project.todoapp.toDoList.ToDoList;
import tbz.project.todoapp.toDoList.ToDoListDTO;
import tbz.project.todoapp.toDoList.ToDoListRepository;
import tbz.project.todoapp.toDoList.ToDoListService;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
@WithMockUser(username = "jesteban", password = "esteban123", roles = {"USER"})
public class ToDoListControllerTest {
  @Autowired
  private MockMvc mvc;
  @Autowired
  private ToDoListService taskService;
  @Autowired
  private ToDoListRepository taskRepository;
  @Test
  @Transactional
  @Sql("/TestData.sql")
  void deleteToDoList() throws Exception {
    //WHEN
    MvcResult res = mvc.perform(delete("/list/{id}", 1)).andReturn();
    //THEN
    Assert.assertEquals(204, res.getResponse().getStatus());
  }

  @Test
  @Transactional
  @Sql("/TestData.sql")

  void createToDoList() throws Exception {
    //GIVEN
    JSONObject todoList = new JSONObject();
    todoList.put("name", "monday");

    //WHEN
    MvcResult res = mvc.perform(
        post("/list/{userId}", 10).content(todoList.toString()).contentType(MediaType.APPLICATION_JSON))
        .andReturn();
    //THEN
    Assert.assertEquals(201, res.getResponse().getStatus());
    JSONAssert.assertEquals(String.valueOf(todoList), res.getResponse().getContentAsString(), JSONCompareMode.LENIENT);
  }

  @Test
  @Transactional
  @Sql("/TestData.sql")
  void updateToDoList() throws Exception {
    //GIVEN

    JSONObject todolist = new JSONObject();
    todolist.put("toDoListId", 1);
    todolist.put("name", "passed");

    JSONObject user = new JSONObject();
    user.put("userId", 10);
    user.put("firstName","test");
    user.put("lastName","test");
    user.put("email","test@gmail.com");
    user.put("username","test");
    user.put("password","$2a$10$FiqmJs.ytHcn3ajXdvKHT.4duVLIO4SC5tiPhYGGQ6ZSPZsfb9Gjy");
    user.put("roles",new JSONArray());
    todolist.put("user", user);
    //WHEN
    MvcResult res = mvc.perform(
        put("/list/{id}", 1).content(todolist.toString()).contentType(MediaType.APPLICATION_JSON))
        .andReturn();
    //THEN
    Assert.assertEquals(200, res.getResponse().getStatus());
    System.out.println(String.valueOf(todolist)+ "expected");
    System.out.println(res.getResponse().getContentAsString()+ "received");
    JSONAssert.assertEquals(String.valueOf(todolist), res.getResponse().getContentAsString(), JSONCompareMode.LENIENT);
  }
  @Test
  @Transactional
  @Sql("/TestData.sql")
  void getToDoList() throws Exception {
    //GIVEN
    ObjectMapper objectMapper = new ObjectMapper();
    //WHEN
    MvcResult res = mvc.perform(get("/list/{id}", 1)).andReturn();
    ToDoListDTO toDoListDTO = objectMapper.readValue(res.getResponse().getContentAsString(), ToDoListDTO.class);
    //THEN
    Assert.assertEquals(200, res.getResponse().getStatus());
    Assert.assertEquals(1, toDoListDTO.getTasks().size());
    Assert.assertEquals("testing", toDoListDTO.getName());

  }


}
