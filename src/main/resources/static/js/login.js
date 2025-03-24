export function login(name,password){
	return $.ajax({
		url:'/login',
		type:'POST',
		data:{username,password}
	});
}

$(document).ready(function() {
    // 表单提交事件
    $('#loginForm').on('submit', function(e) {
        e.preventDefault();
        
        const username = $('#username').val();
        const password = $('#password').val();
        
        // 执行登录AJAX请求
        $.ajax({
            url: '/login',
            type: 'POST',
            data: {
                username: username,
                password: password
            },
            success: function(response) {
                if (response.success) {
                    // 登录成功，跳转到员工列表页面
                    window.location.href = '/employees/list';
                } else {
                    // 登录失败，显示错误信息
                    $('#errorMessage').text(response.message).show();
                }
            },
            error: function() {
                $('#errorMessage').text('服务器错误，请稍后再试').show();
            }
        });
    });
});
