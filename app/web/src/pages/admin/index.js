import { Component } from 'react';
import RenderAuthorized from 'ant-design-pro/lib/Authorized';
import { getAuthority } from '@/utils/authority';
import Redirect from 'umi/redirect';

const Authority = getAuthority();
const Authorized = RenderAuthorized(Authority);

  // 检查用户是否过期；后续再整；

export default ({ children }) => {
  return (
    <Authorized authority={getAuthority() || []} noMatch={<Redirect to="/user/login" />}>
      {children}
    </Authorized>
  )
}