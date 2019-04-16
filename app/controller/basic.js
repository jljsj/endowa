'use strict';

const Controller = require('egg').Controller;

class BasicController extends Controller {
  async fetchAll() {
    const { ctx } = this;
    const basicData = await ctx.service.basic.getAllData();
    ctx.body = basicData;
  }
  async fetch() {
    const { ctx } = this;
    const basicData = await ctx.service.basic.getData();
    ctx.body = basicData;
  }
  async update() {
    const { ctx } = this;
    const basicData = await ctx.service.basic.updateData();
    ctx.body = basicData;
  }
}

module.exports = BasicController;
