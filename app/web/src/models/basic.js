import { queue } from '@/services/api';
import { message } from 'antd';

const noJsonObj = {
  service: 1,
  about: 1
}

export default {
  namespace: 'basic',
  state: {
    basic: {},
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queue, { src: `/basic/fetch/${payload.id}` });
      yield put({
        type: 'getBasicData',
        payload: {
          ...response,
          values: payload.id === 'basic' || payload.id === 'contact' ? JSON.parse(response.values) : response.values,
        },
      })
    },
    *fetchAll(_, { call, put }) {
      let response = yield call(queue, { src: `/basic/fetch` });
      response = response.map($item => {
        const item = { ...$item };
        item.values = item.key === 'basic' || item.key === 'contact' ? JSON.parse(item.values) : item.values;
        return item;
      });
      yield put({
        type: 'getBasicData',
        payload: {
          all: response,
        },
      })
    },
    *update({ payload, messages }, { call, put }) {
      const noJson = noJsonObj[payload.id];
      const response = yield call(queue, {
        src: `/basic/update/${payload.id}`, body: {
          ...payload,
          values: !noJson ? JSON.stringify(payload.values) : payload.values,
        }
      });
      if (response.status === 'ok') {
        message.success(messages || '保存成功');
      }
      yield put({
        type: 'getBasicData',
        payload: {
          ...response,
          values: noJson ? response.values :JSON.parse(response.values),
        },
      })
    }
  },
  reducers: {
    getBasicData(state, { payload }) {
      return {
        ...state,
        basic: payload,
      };
    }
  }
}
