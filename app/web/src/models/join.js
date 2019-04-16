import { queue } from '@/services/api';

export default {
  namespace: 'join',
  state: {
    data: []
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queue, { src: '/list/post/fetch', body: { ...payload } });
      yield put({
        type: 'getJoinData',
        payload: {
          data: response.data,
        },
      });
    },
  },
  reducers: {
    getJoinData(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  }
}