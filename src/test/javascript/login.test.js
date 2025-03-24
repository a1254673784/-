import { login } from '../js/login';
import $ from 'jquery';

// 使用 jsdom 模拟 DOM 环境
global.$ = require('jquery');
global.window = { location: { href: '' } };

jest.mock('jquery', () => ({
    ajax: jest.fn()
}));

describe('Login Function', () => {
    test('成功登录应跳转到员工列表页面', async () => {
        // 模拟 Ajax 成功返回
        $.ajax.mockResolvedValue({ success: true });

        await login('admin', 'admin123');
        
        expect(window.location.href).toBe('/employees/list');
    });

    test('登录失败应显示错误信息', async () => {
        // 模拟 Ajax 失败返回
        $.ajax.mockResolvedValue({ success: false, message: '用户名或密码错误' });

        await login('wrong_user', 'wrong_pass');

        expect($('#errorMessage').text()).toBe('用户名或密码错误');
    });

    test('服务器错误应显示通用错误信息', async () => {
        // 模拟 Ajax 请求失败
        $.ajax.mockRejectedValue(new Error('服务器错误'));

        await login('user', 'pass');

        expect($('#errorMessage').text()).toBe('服务器错误，请稍后再试');
    });
});
