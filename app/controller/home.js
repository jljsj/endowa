'use strict';
const path = require('path');
const fs = require('mz/fs');
const awaitWriteStream = require('await-stream-ready').write;
const sendToWormhole = require('stream-wormhole');
const md5 = require('md5');
const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    await this.ctx.render('index.html');
  }
  async login() {
    const { ctx } = this;
    const userInfo = await ctx.service.user.login();
    ctx.body = userInfo;
  }
  async getUser() {
    const { ctx } = this;
    const userInfo = await ctx.service.user.getUser();
    ctx.body = userInfo;
  }
  async upload() {
    const { ctx } = this;
    const stream = await ctx.getFileStream();
    const filename = `${md5(`${stream.filename}${Date.now()}`)}${path
      .extname(stream.filename)
      .toLocaleLowerCase()}`;
    const target = path.join(this.config.baseDir, 'app/uploads', filename);
    const writeStream = fs.createWriteStream(target);
    try {
      await awaitWriteStream(stream.pipe(writeStream));
    } catch (err) {
      await sendToWormhole(stream);
      throw err;
    }

    ctx.body = {
      url: '/uploads/' + filename,
    };
  }
}

module.exports = HomeController;
