import { queue } from '@/services/api';

export default {
  namespace: 'honor',
  state: {
    data: []
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queue, { src: '/list/honor/fetch', body: { ...payload } });
      yield put({
        type: 'getHonorData',
        payload: {
          data: response.data,
        },
      });
    },
  },
  reducers: {
    getHonorData(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  }
}