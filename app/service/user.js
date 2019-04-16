'use strict';
const Service = require('egg').Service;
class UserService extends Service {
  async login() {
    // const result = await this.app.mysql.insert('adminusers', { name: 'admin', password: 123456, purview: 'admin,news,product,about' });
    const { userName, type, password } = this.ctx.request.body;
    const user = await this.app.mysql.get('web_user', { name: userName });// .query('select * from user where id = ?', 1);// this.ctx.db.query('select * from user where uid = ?', uid);
    if (!user || (userName === user.name && user.password !== password)) {
      return {
        status: 'error',
        type,
        userName,
      };
    }
    this.ctx.session.maxAge = 1000 * 60 * 60 * 8;
    this.ctx.session.user = user;
    return {
      status: 'ok',
      type,
      userName,
    };
  }
  async getUser() {
    const { userName } = this.ctx.request.body;
    const { user } = this.ctx.session;
    if (user && user.name === userName) {
      // 重载 user, 权限更改后的刷新；
      const user = await this.app.mysql.get('web_user', { name: userName });
      const $user = { ...user };
      delete $user.password;
      const navList = await this.app.mysql.select('admin_nav_list');
      return {
        status: 200,
        user: $user,
        navList,
      };
    }
    return {
      status: 401,
    };
  }

}
module.exports = UserService;
