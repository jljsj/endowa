'use strict';
const Service = require('egg').Service;
class basicService extends Service {
  async getAllData() {
    const basic = await this.app.mysql.select('web_basic');
    return basic;
  }
  async getData() {
    const { id } = this.ctx.params;
    const basic = await this.app.mysql.get('web_basic', { key: id });
    return basic;
  }
  async updateData() {
    const { values, type } = this.ctx.request.body;
    const { id } = this.ctx.params;
    const updateBasic = await this.app.mysql.update('web_basic', { values }, { where: { key: id } });
    if (updateBasic.affectedRows === 1) {
      const basic = await this.app.mysql.get('web_basic', { key: id });
      return {
        status: 'ok',
        type,
        ...basic,
      };
    }
    return {
      status: 'error',
      type,
      basic: null,
    };
  }
}

module.exports = basicService;

