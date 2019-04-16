import { queue } from '@/services/api';

export default {
  namespace: 'product',
  state: {
    data: [],
    currentItem: null,
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queue, { src: `/list/product/fetch`, body: { ...payload } });
      yield put({
        type: 'getProductData',
        payload: {
          data: response.data,
        },
      });
    },
    *fetchCurrent({ payload }, { call, put }) {
      const response = yield call(queue, {
        src: `/list/product/fetch/${payload.index}`,
        body: payload,
      });
      console.log(response)
      yield put({
        type: 'getProductData',
        payload: response,
      });
    },
  },
  reducers: {
    getProductData(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  }
}