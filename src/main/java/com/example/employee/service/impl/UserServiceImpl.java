package com.example.employee.service.impl;

import com.example.employee.mapper.UserMapper;
import com.example.employee.model.User;
import com.example.employee.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserMapper userMapper;

    @Override
    public User login(String username, String password) {
        User user = userMapper.findByUsername(username);
        
        if (user != null && password.equals(user.getPassword())) {
            return user;
        }
        
        return null;
    }
}