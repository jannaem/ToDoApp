insert into todoapp.user (id, email, first_name, last_name, password, username)
       values (10, 'test@gmail.com', 'test', 'test','$2a$10$FiqmJs.ytHcn3ajXdvKHT.4duVLIO4SC5tiPhYGGQ6ZSPZsfb9Gjy', 'test');

 insert into todoapp.to_do_list(id, name, user_id)
 values(1, 'testing', 10);
 insert into todoapp.task(id, name, status) values (1, 'passing the test', true);
 insert into todoapp.to_do_list_task(id, id_list, id_task) values (1, 1, 1);

