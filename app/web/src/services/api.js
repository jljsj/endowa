import request from '../utils/request';

export async function fakeAccountLogin(params) {
  return request('/login/account', {
    method: 'POST',
    data: params,
  });
}
export async function queue({ src, body }){
  return request(src, {
    method: 'POST',
    data: body
  });
}