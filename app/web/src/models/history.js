import { queue } from '@/services/api';

export default {
  namespace: 'history',
  state: {
    data: []
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queue, { src: `/list/history/fetch`, body: { ...payload } });
      yield put({
        type: 'getHistoryData',
        payload: {
          data: response.data,
        },
      });
    },
  },
  reducers: {
    getHistoryData(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  }
}