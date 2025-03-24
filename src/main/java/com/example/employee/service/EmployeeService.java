package com.example.employee.service;

import com.example.employee.model.Employee;

import java.util.List;

public interface EmployeeService {
    List<Employee> getAllEmployees();
    
    Employee getEmployeeById(Integer id);
    
    boolean addEmployee(Employee employee);
    
    boolean updateEmployee(Employee employee);
    
    boolean deleteEmployee(Integer id);
}