$(document).ready(function() {
    // 获取URL中的员工ID参数
    const urlParams = new URLSearchParams(window.location.search);
    const employeeId = urlParams.get('id');
    
    // 根据是否有ID判断是添加还是编辑操作
    if (employeeId) {
        $('#formTitle').text('编辑员工');
        $('#employeeId').val(employeeId);
        loadEmployeeData(employeeId);
    } else {
        $('#formTitle').text('添加员工');
        // 设置默认值
        $('#status').val('1');
        $('#hireDate').val(new Date().toISOString().split('T')[0]);
    }
    
    // 取消按钮点击事件
    $('#cancelBtn').on('click', function() {
        window.location.href = '/employees/list';
    });
    
    // 表单提交事件
    $('#employeeForm').on('submit', function(e) {
        e.preventDefault();
        saveEmployee();
    });
});

// 加载员工数据
function loadEmployeeData(id) {
    $.ajax({
        url: `/employees/api/${id}`,
        type: 'GET',
        success: function(employee) {
            if (employee) {
                fillFormData(employee);
            } else {
                alert('未找到员工数据');
                window.location.href = '/employees/list';
            }
        },
        error: function() {
            alert('加载员工数据失败');
            window.location.href = '/employees/list';
        }
    });
}

// 填充表单数据
function fillFormData(employee) {
    $('#name').val(employee.name);
    $('#gender').val(employee.gender);
    $('#birthDate').val(formatDate(employee.birthDate));
    $('#phone').val(employee.phone);
    $('#email').val(employee.email);
    $('#department').val(employee.department);
    $('#position').val(employee.position);
    $('#hireDate').val(formatDate(employee.hireDate));
    $('#salary').val(employee.salary);
    $('#status').val(employee.status);
}

// 格式化日期为YYYY-MM-DD
function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
}

// 保存员工数据
function saveEmployee() {
    // 获取表单数据
    const employeeId = $('#employeeId').val();
    const employeeData = {
        name: $('#name').val(),
        gender: $('#gender').val(),
        birthDate: $('#birthDate').val() || null,
        phone: $('#phone').val(),
        email: $('#email').val(),
        department: $('#department').val(),
        position: $('#position').val(),
        hireDate: $('#hireDate').val() || null,
        salary: $('#salary').val() ? parseFloat($('#salary').val()) : null,
        status: parseInt($('#status').val())
    };
    
    // 如果是编辑，添加ID
    if (employeeId) {
        employeeData.id = parseInt(employeeId);
    }
    
    // 发送AJAX请求
    $.ajax({
        url: employeeId ? '/employees/api/update' : '/employees/api/add',
        type: employeeId ? 'PUT' : 'POST',
        contentType: 'application/json',
        data: JSON.stringify(employeeData),
        success: function(response) {
            if (response.success) {
                alert(response.message);
                window.location.href = '/employees/list';
            } else {
                alert(response.message || '操作失败');
            }
        },
        error: function() {
            alert('服务器错误，请稍后再试');
        }
    });
}