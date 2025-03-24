package com.example.employee.service;

import com.example.employee.model.User;

public interface UserService {
    User login(String username, String password);
}