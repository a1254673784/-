package com.example.employee.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.example.employee.model.User;
import com.example.employee.service.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.Mockito.when;

@SpringBootTest
@AutoConfigureMockMvc
public class LoginControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    @Test
    public void testLoginSuccess() throws Exception {
        // 模拟 UserService 的行为
        User user = new User();
        user.setUsername("admin");
        user.setPassword("admin123");
        when(userService.login("admin", "admin123")).thenReturn(user); // 修正密码

        // 发送登录请求
        mockMvc.perform(post("/login")
                .param("username", "admin")
                .param("password", "admin123"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("登录成功"));
    }

    @Test
    public void testLoginFailure() throws Exception {
        // 模拟 UserService 的行为
        when(userService.login("john_doe", "wrong_password")).thenReturn(null);

        // 发送登录请求
        mockMvc.perform(post("/login")
                .param("username", "john_doe")
                .param("password", "wrong_password"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("用户名或密码错误"));
    }
}