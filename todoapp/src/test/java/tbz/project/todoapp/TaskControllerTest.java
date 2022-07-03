package tbz.project.todoapp;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;

import javax.transaction.Transactional;
import org.json.JSONObject;
import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.skyscreamer.jsonassert.JSONAssert;
import org.skyscreamer.jsonassert.JSONCompareMode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import tbz.project.todoapp.task.TaskRepository;
import tbz.project.todoapp.task.TaskService;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
@WithMockUser(username = "jesteban", password = "esteban123", roles = {"USER"})
public class TaskControllerTest {
  @Autowired
  private MockMvc mvc;
  @Autowired
  private TaskService taskService;
  @Autowired
  private TaskRepository taskRepository;

  @Test
  @Transactional
  @Sql("/TestData.sql")
  void updateTask() throws Exception {
    //GIVEN
    JSONObject task = new JSONObject();
    task.put("name", "passed");
    task.put("status", true);
    //WHEN
    MvcResult res = mvc.perform(
        put("/task/{listid}", 1).content(task.toString()).contentType(MediaType.APPLICATION_JSON))
        .andReturn();
    //THEN
    Assert.assertEquals(200, res.getResponse().getStatus());
    JSONAssert.assertEquals(String.valueOf(task), res.getResponse().getContentAsString(), JSONCompareMode.LENIENT);
  }

  @Test
  @Transactional
  @Sql("/TestData.sql")
  void createTask() throws Exception {
    //GIVEN
    JSONObject task = new JSONObject();
    task.put("name", "passed");
    task.put("status", true);

    //WHEN
    MvcResult res = mvc.perform(
        post("/task/{listId}", 1).content(task.toString()).contentType(MediaType.APPLICATION_JSON))
        .andReturn();
    //THEN
    Assert.assertEquals(201, res.getResponse().getStatus());
    JSONAssert.assertEquals(String.valueOf(task), res.getResponse().getContentAsString(), JSONCompareMode.LENIENT);
  }

  @Test
  @Transactional
  @Sql("/TestData.sql")
  void getTask() throws Exception {
    //WHEN
    MvcResult res = mvc.perform(get("/task/{id}", 1)).andReturn();
    //THEN
    Assert.assertEquals(200, res.getResponse().getStatus());
    Assert.assertTrue(res.getResponse().getContentAsString().contains("passing the test"
    ));
  }

  @Test
  @Transactional
  @Sql("/TestData.sql")
  void deleteTask() throws Exception {
    //WHEN
    MvcResult res = mvc.perform(delete("/task/{id}", 1)).andReturn();
    //THEN
    Assert.assertEquals(204, res.getResponse().getStatus());
  }

}
