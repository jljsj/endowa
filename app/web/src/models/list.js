import { queue } from '@/services/api';
import { message } from 'antd';

export default {
  namespace: 'list',
  state: {
    itemList: [],
    preItem: null,
    nextItem: null,
    currentItem: {},
    hot: [],
    data: [],
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queue, { src: `/list/${payload.path}/fetch`, body: { ...payload } });
      yield put({
        type: 'getItemData',
        payload: response,
      });
    },
    *fetchHot({ payload }, { call, put }) {
      const response = yield call(queue, { src: `/list/${payload.path}/fetch`, body: { ...payload } });
      yield put({
        type: 'getItemHotData',
        payload: response.data,
      });
    },
    *update({ payload }, { call, put }) {
      const response = yield call(queue, {
        src: `/list/${payload.path}/update/${payload.id}`, body: payload,
      });
      if(response.status === 'ok') {
        message.success('修改成功');
      }
      yield put({
        type: 'getItemData',
        payload: response,
      });
    },
    *sequence({ payload }, { call, put }) {
      const response = yield call(queue, {
        src: `/list/${payload.path}/sequence`,
        body: payload,
      });
      yield put({
        type: 'getItemData',
        payload: response,
      });
    },
    *create({ payload }, { call, put }) {
      const response = yield call(queue, {
        src: `/list/${payload.path}/create`,
        body: payload,
      });
      if(response.status === 'ok') {
        message.success('新增成功');
      }
      yield put({
        type: 'getItemData',
        payload: response,
      });
    },
    *remove({ payload }, { call, put }) {
      const response = yield call(queue, {
        src: `/list/${payload.path}/remove`,
        body: payload,
      });
      if(response.status === 'ok') {
        message.success('删除成功');
      }
      yield put({
        type: 'getItemData',
        payload: response,
      });
    },
    *fetchCurrent({ payload }, { call, put }) {
      const response = yield call(queue, {
        src: `/list/${payload.path}/fetch/${payload.index}`,
        body: payload,
      });
      yield put({
        type: 'getItemData',
        payload: response,
      });
    },
  },
  reducers: {
    getItemData(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    getItemHotData(state, { payload }) {
      return {
        ...state,
        hot: payload,
      };
    },
  }
}