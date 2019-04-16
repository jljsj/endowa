import { queue } from '@/services/api';

export default {
  namespace: 'classify',
  state: {
    data: [],
    footerNewsClassify: [],
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queue, { src: `/list/${payload.path}/fetch`, body: { ...payload } });
      yield put({
        type: 'getClassifyData',
        payload: response,
      });
    },
    *footerFetch(_, { call, put }) {
      const newsResponse = yield call(queue, { src: `/list/newsClassify/fetch` });
      yield put({
        type: 'getFooterClassifyData',
        payload: {
          footerNewsClassify: newsResponse.data,
        },
      });
    },
  },
  reducers: {
    getClassifyData(state, { payload }) {
      return {
        ...state,
        data: payload.data,
      };
    },
    getFooterClassifyData(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    }
  }
}
