import { queue } from '@/services/api';

export default {
  namespace: 'product',
  state: {
    data: [],
    hot: [],
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
    *fetchHot({ payload }, { call, put }) {
      const response = yield call(queue, { src: `/list/product/fetch`, body: { ...payload } });
      yield put({
        type: 'getProductHotData',
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
    getProductHotData (state, { payload }) {
      console.log(payload)
      return {
        ...state,
        hot: payload.data,
      }
    }
  }
}