'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {

  async login() {
    const { ctx } = this;
    const userInfo = await ctx.service.user.login();
    ctx.body = userInfo;
  }
  async getUser() {
    const { ctx } = this;
    const userInfo = await ctx.service.user.getUser();
    if (userInfo.status === 401) {
      ctx.status = 401;
    } else {
      ctx.body = userInfo;
    }
  }
}

module.exports = UserController;
