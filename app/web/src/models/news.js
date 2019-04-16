import { queue } from '@/services/api';

export default {
  namespace: 'news',
  state: {
    data: []
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queue, { src: `/list/news/fetch`, body: { ...payload } });
      yield put({
        type: 'getNewsData',
        payload: {
          data: response.data,
        },
      });
    },
    *fetchCurrent({ payload }, { call, put }) {
      const response = yield call(queue, {
        src: `/list/news/fetch/${payload.index}`,
        body: payload,
      });
      yield put({
        type: 'getNewsData',
        payload: response,
      });
    },
  },
  reducers: {
    getNewsData(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  }
}