import { queue } from '@/services/api';

const getNavList = (purview, listData) => {
  return (purview || '').split(',').map(key => {
    return listData.find(item => (key === item.key));
  }).sort((a, b) => (
    a.order - b.order
  )).filter(c => c);
}

export default {
  namespace: 'user',
  state: {
    currentUser: {
      user: {},
      navList: [],
      navListAll: [],
    },
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queue, { src: '/user/getuser', body: payload });
      if (response) {
        const { user, navList, status } = response;
        if (status === 200) {
          const $navList = getNavList(user.purview, navList);
          yield put({
            type: 'getUserData',
            payload: {
              ...response,
              navList: $navList,
              navListAll: navList,
            },
          });
        }
      } else {
        yield put({
          type: 'getUserData',
          payload: {
            user: {},
            navList: [],
          },
        });
      }
    },
  },
  reducers: {
    getUserData(state, action) {
      return {
        ...state,
        currentUser: action.payload,
      };
    },
  }
};
