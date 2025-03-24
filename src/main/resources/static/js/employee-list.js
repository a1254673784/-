$(document).ready(function() {
    // 加载员工列表数据
    loadEmployees();
    
    // 添加员工按钮点击事件
    $('#addEmployeeBtn').on('click', function() {
        window.location.href = '/employees/edit';
    });
    
    // 删除确认按钮点击事件
    $('#confirmDeleteBtn').on('click', function() {
        const employeeId = $(this).data('id');
        deleteEmployee(employeeId);
    });
});

// 加载员工列表
function loadEmployees() {
    $.ajax({
        url: '/employees/api/list',
        type: 'GET',
        success: function(data) {
            $('#loadingMessage').hide();
            
            if (data && data.length > 0) {
                renderEmployeeTable(data);
            } else {
                $('#noDataMessage').show();
            }
        },
        error: function() {
            $('#loadingMessage').hide();
            alert('加载数据失败，请刷新页面重试');
        }
    });
}

// 渲染员工表格
function renderEmployeeTable(employees) {
    const tableBody = $('#employeeTableBody');
    tableBody.empty();
    
    employees.forEach(function(employee) {
        const row = $('<tr></tr>');
        
        // 格式化日期
        const hireDate = employee.hireDate ? new Date(employee.hireDate).toLocaleDateString() : '-';
        
        row.append(`<td>${employee.id}</td>`);
        row.append(`<td>${employee.name}</td>`);
        row.append(`<td>${employee.gender || '-'}</td>`);
        row.append(`<td>${employee.department || '-'}</td>`);
        row.append(`<td>${employee.position || '-'}</td>`);
        row.append(`<td>${employee.phone || '-'}</td>`);
        row.append(`<td>${hireDate}</td>`);
        
        // 操作按钮
        const actionCell = $('<td></td>');
        
        // 编辑按钮
        const editBtn = $(`<button class="btn btn-sm btn-primary btn-action"><i class="fa fa-edit"></i> 编辑</button>`);
        editBtn.on('click', function() {
            window.location.href = `/employees/edit?id=${employee.id}`;
        });
        
        // 删除按钮
        const deleteBtn = $(`<button class="btn btn-sm btn-danger btn-action"><i class="fa fa-trash"></i> 删除</button>`);
        deleteBtn.on('click', function() {
            showDeleteConfirm(employee.id, employee.name);
        });
        
        actionCell.append(editBtn);
        actionCell.append(deleteBtn);
        row.append(actionCell);
        
        tableBody.append(row);
    });
}

// 显示删除确认对话框
function showDeleteConfirm(id, name) {
    $('#deleteEmployeeName').text(name);
    $('#confirmDeleteBtn').data('id', id);
    $('#deleteConfirmModal').modal('show');
}

// 删除员工
function deleteEmployee(id) {
    $.ajax({
        url: `/employees/api/${id}`,
        type: 'DELETE',
        success: function(response) {
            $('#deleteConfirmModal').modal('hide');
            
            if (response.success) {
                // 删除成功，重新加载数据
                loadEmployees();
            } else {
                alert(response.message || '删除失败');
            }
        },
        error: function() {
            $('#deleteConfirmModal').modal('hide');
            alert('服务器错误，请稍后再试');
        }
    });
}