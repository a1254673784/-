package com.example.employee.service.impl;

import com.example.employee.mapper.EmployeeMapper;
import com.example.employee.model.Employee;
import com.example.employee.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    @Autowired
    private EmployeeMapper employeeMapper;

    @Override
    public List<Employee> getAllEmployees() {
        return employeeMapper.findAll();
    }

    @Override
    public Employee getEmployeeById(Integer id) {
        return employeeMapper.findById(id);
    }

    @Override
    public boolean addEmployee(Employee employee) {
        if (employee.getStatus() == null) {
            employee.setStatus(1); // 默认为激活状态
        }
        return employeeMapper.insert(employee) > 0;
    }

    @Override
    public boolean updateEmployee(Employee employee) {
        return employeeMapper.update(employee) > 0;
    }

    @Override
    public boolean deleteEmployee(Integer id) {
        return employeeMapper.deleteById(id) > 0;
    }
}