'use strict';
const Service = require('egg').Service;
class ListService extends Service {
  async getPageData() {
    const { pageSize, page, classify, hot, show } = this.ctx.request.body;
    const { path } = this.ctx.params;
    const offset = page * pageSize - 1;
    const count = await this.app.mysql.query(`SELECT COUNT(*) FROM web_${path}`);
    const values = { orders: [[ 'index', 'desc' ]] };
    if (typeof hot !== 'undefined') {
      values.where = { hot: 1 };
    }
    if (typeof show !== 'undefined') {
      values.where = { ...values.where, show: 1 };
    }
    if (pageSize) {
      values.limit = pageSize + 1;
      values.offset = offset >= 0 ? offset : 0;
    }
    if (classify && classify.length) {
      values.where = { ...values.where, classify };
    }
    // 前后都各多取一个，上下移动时使用；
    const data = await this.app.mysql.select(`web_${path}`, values);
    const itemList = pageSize ? data.filter((_, i) => {
      return (!page || i) && i < data.length - 1 || (data.length - 1 < pageSize && i === data.length - 1);
    }) : data;
    const preItem = page ? data[0] : null;
    const nextItem = data.length - 1 < pageSize ? null : data[data.length - 1];
    return {
      itemList,
      preItem,
      nextItem,
      data,
      total: count[0]['COUNT(*)'],
    };
  }
  async reGetPageData(bool, type) {
    if (bool) {
      const data = await this.getPageData();
      return {
        ...(data),
        type,
        status: 'ok',
      };
    }
    return {
      status: 'error',
      type,
      basic: null,
    };
  }
  async updateData() {
    const { item, type } = this.ctx.request.body;
    const { path, id } = this.ctx.params;
    const updateData = await this.app.mysql.update(`web_${path}`, { ...item }, { where: { index: id } });
    return await this.reGetPageData(updateData.affectedRows === 1, type);
  }
  async updateSequence() {
    const { item: items, type } = this.ctx.request.body;
    const { path } = this.ctx.params;
    const { app } = this;
    const bool = (await Promise.all(items.map(async item => {
      const { index, ...rest } = item;
      const update = await app.mysql.update(`web_${path}`, { ...rest }, { where: { index } });
      return update.affectedRows;
    }))).some(c => c);
    return await this.reGetPageData(bool, type);
  }
  async createData() {
    const { value, type } = this.ctx.request.body;
    const { path } = this.ctx.params;
    const { app } = this;
    const result = await app.mysql.insert(`web_${path}`, value);
    if (path.match('Classify')) {
      await this.app.mysql.update(`web_${path}`, { classify: result.insertId }, { where: { index: result.insertId } });
    }
    return await this.reGetPageData(result.affectedRows, type);
  }
  async removeData() {
    const { keys, type } = this.ctx.request.body;
    const { app } = this;
    const { path } = this.ctx.params;
    const bool = (await Promise.all(keys.map(async key => {
      const deleteData = await app.mysql.delete(`web_${path}`, { index: key });
      return deleteData.affectedRows;
    }))).some(c => c);
    return await this.reGetPageData(bool, type);
  }
  async getCurrentData() {
    const { index } = this.ctx.request.body;
    const { path } = this.ctx.params;
    const currentItem = await this.app.mysql.get(`web_${path}`, { index });
    return { currentItem };
  }
}

module.exports = ListService;

