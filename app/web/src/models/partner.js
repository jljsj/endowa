import { queue } from '@/services/api';

export default {
  namespace: 'partner',
  state: {
    data: []
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queue, { src: `/list/partner/fetch`, body: { ...payload } });
      yield put({
        type: 'getPartnerData',
        payload: {
          data: response.data,
        },
      });
    },
  },
  reducers: {
    getPartnerData(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  }
}