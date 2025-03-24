package com.example.employee.controller;

import com.example.employee.model.Employee;
import com.example.employee.model.User;
import com.example.employee.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/employees")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    // 检查用户是否已登录
    private boolean checkLogin(HttpSession session) {
        return session.getAttribute("currentUser") != null;
    }

    // 员工列表页面
    @GetMapping("/list")
    public String list(HttpSession session, Model model) {
        if (!checkLogin(session)) {
            return "redirect:/login";
        }
        
        User currentUser = (User) session.getAttribute("currentUser");
        model.addAttribute("username", currentUser.getUsername());
        
        return "employee-list";
    }
    
    // 获取所有员工数据
    @GetMapping("/api/list")
    @ResponseBody
    public List<Employee> getAllEmployees(HttpSession session) {
        if (!checkLogin(session)) {
            return null;
        }
        return employeeService.getAllEmployees();
    }

    // 员工详情页面
    @GetMapping("/edit")
    public String edit(@RequestParam(required = false) Integer id, HttpSession session, Model model) {
        if (!checkLogin(session)) {
            return "redirect:/login";
        }
        
        model.addAttribute("employeeId", id);
        return "employee-details";
    }
    
    // 根据ID获取员工
    @GetMapping("/api/{id}")
    @ResponseBody
    public Employee getEmployeeById(@PathVariable Integer id, HttpSession session) {
        if (!checkLogin(session)) {
            return null;
        }
        return employeeService.getEmployeeById(id);
    }
    
    // 添加员工
    @PostMapping("/api/add")
    @ResponseBody
    public Map<String, Object> addEmployee(@RequestBody Employee employee, HttpSession session) {
        Map<String, Object> result = new HashMap<>();
        
        if (!checkLogin(session)) {
            result.put("success", false);
            result.put("message", "未登录或会话已过期");
            return result;
        }
        
        boolean success = employeeService.addEmployee(employee);
        
        result.put("success", success);
        result.put("message", success ? "添加员工成功" : "添加员工失败");
        
        return result;
    }
    
    // 更新员工
    @PutMapping("/api/update")
    @ResponseBody
    public Map<String, Object> updateEmployee(@RequestBody Employee employee, HttpSession session) {
        Map<String, Object> result = new HashMap<>();
        
        if (!checkLogin(session)) {
            result.put("success", false);
            result.put("message", "未登录或会话已过期");
            return result;
        }
        
        boolean success = employeeService.updateEmployee(employee);
        
        result.put("success", success);
        result.put("message", success ? "更新员工成功" : "更新员工失败");
        
        return result;
    }
    
    // 删除员工
    @DeleteMapping("/api/{id}")
    @ResponseBody
    public Map<String, Object> deleteEmployee(@PathVariable Integer id, HttpSession session) {
        Map<String, Object> result = new HashMap<>();
        
        if (!checkLogin(session)) {
            result.put("success", false);
            result.put("message", "未登录或会话已过期");
            return result;
        }
        
        boolean success = employeeService.deleteEmployee(id);
        
        result.put("success", success);
        result.put("message", success ? "删除员工成功" : "删除员工失败");
        
        return result;
    }
}