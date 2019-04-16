import { parse, stringify } from 'qs';

export const getImg = (str) => require(`../../image/${str}`);

export function getPageQuery() {
  return parse(window.location.href.split('?')[1]);
}

export const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
    xxl: { span: 14 },
  },
};
export const submitFormLayout = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 10, offset: 5 },
  },
};

export const getId = (location) => {
  const paths = location.pathname.split('/');
  return paths[paths.length - 1];
}

export const getPaths = ({ pathname }) => pathname.split('/');