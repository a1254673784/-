package com.example.employee.mapper;

import com.example.employee.model.Employee;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface EmployeeMapper {
    List<Employee> findAll();
    
    Employee findById(Integer id);
    
    int insert(Employee employee);
    
    int update(Employee employee);
    
    int deleteById(Integer id);
}