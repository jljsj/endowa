'use strict';

const Controller = require('egg').Controller;

class ListController extends Controller {

  async fetch() {
    const { ctx } = this;
    const current = await ctx.service.list.getPageData();
    ctx.body = current;
  }
  async update() {
    const { ctx } = this;
    const current = await ctx.service.list.updateData();
    ctx.body = current;
  }
  async sequence() {
    const { ctx } = this;
    const current = await ctx.service.list.updateSequence();
    ctx.body = current;
  }
  async create() {
    const { ctx } = this;
    const current = await ctx.service.list.createData();
    ctx.body = current;
  }
  async remove() {
    const { ctx } = this;
    const current = await ctx.service.list.removeData();
    ctx.body = current;
  }
  async getCurrent() {
    const { ctx } = this;
    const current = await ctx.service.list.getCurrentData();
    ctx.body = current;
  }
}

module.exports = ListController;
