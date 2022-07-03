package tbz.project.todoapp;

import com.fasterxml.jackson.databind.ObjectMapper;
import net.minidev.json.JSONArray;
import net.minidev.json.JSONObject;
import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.skyscreamer.jsonassert.JSONAssert;
import org.skyscreamer.jsonassert.JSONCompareMode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import tbz.project.todoapp.user.UserRepository;
import tbz.project.todoapp.user.UserService;

import javax.transaction.Transactional;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
@WithMockUser(username = "jesteban", password = "esteban123", roles = {"USER"})
public class UserControllerTest {
    @Autowired
    private MockMvc mvc;
    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    @Transactional
    void signUpUser() throws Exception {
        JSONObject newUser = new JSONObject();
        newUser.put("firstName", "Luana");
        newUser.put("lastName", "Schoch");
        newUser.put("email", "luanaschoch@gmail.com");
        newUser.put("username", "luana.schoch");
        newUser.put("password", "luanaSchoch123");
        //WHEN
        MvcResult res = mvc.perform(post("/signUp").content(newUser.toString()).contentType(MediaType.APPLICATION_JSON)).andReturn();
        //THEN
        Assert.assertEquals(201, res.getResponse().getStatus());
    }

    @Test
    @Transactional
    void addNewRole() throws Exception {
        JSONObject role = new JSONObject();
        role.put("name", "SUPERVISOR_ROLE");
        //WHEN
        MvcResult res = mvc.perform(post("/role").content(role.toString()).contentType(MediaType.APPLICATION_JSON)).andReturn();
        //THEN
        Assert.assertEquals(201, res.getResponse().getStatus());
    }
    @Test
    @Transactional
    @Sql("/TestData.sql")
    void getUser() throws Exception{
        //GIVEN
        JSONObject user = new JSONObject();
        user.put("firstName", "test");
        user.put("lastName", "test");
        user.put("email", "test@gmail.com");
        user.put("username", "test");
        user.put("password", "$2a$10$FiqmJs.ytHcn3ajXdvKHT.4duVLIO4SC5tiPhYGGQ6ZSPZsfb9Gjy");
        //WHEN
        MvcResult res = mvc.perform(get("/user/{username}", "test")).andReturn();
        //THEN
        Assert.assertEquals(200, res.getResponse().getStatus());
        JSONAssert.assertEquals(String.valueOf(user), res.getResponse().getContentAsString(), JSONCompareMode.LENIENT);
    }
    @Test
    @Transactional
    @Sql("/TestData.sql")
    void getAllUsers()throws Exception {
        //GIVEN
        //WHEN
        MvcResult res = mvc.perform(get("/users")).andReturn();

        JSONArray array = objectMapper.readValue(res.getResponse().getContentAsString(),JSONArray.class);
        System.out.println(array.get(0).toString() + array.get(1).toString());
        //THEN
        Assert.assertEquals(200, res.getResponse().getStatus());
        //Size is 4 because 2 users are found in the sql file and 2 are added whenever the application is started
        Assert.assertEquals(4, array.size());

    }

    }

