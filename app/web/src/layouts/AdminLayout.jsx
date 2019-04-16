import React, { Component } from 'react';
import { enquireScreen } from 'enquire-js';
import { connect } from 'dva';
import DocumentTitle from 'react-document-title';
import router from 'umi/router';
import { getAuthority } from '@/utils/authority';
import {
  Layout,
} from 'antd';

import MenuNav from './AdminBasic/Menu';
import Header from './AdminBasic/Header';

const {
  Content, Footer, Sider,
} = Layout;



let isMobile;
enquireScreen((b) => {
  isMobile = b;
});

@connect(({ loading, user, routing }) => {
  return {
    user: user.currentUser.user,
    location: routing.location,
    loading: loading.effects['user/fetch'] || !user.currentUser.navList.length,
  };
})
class AdminLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobile,
    };
  }

  componentDidMount() {
    // 适配手机屏幕;
    enquireScreen((b) => {
      this.setState({ isMobile: !!b });
    });
    const { dispatch } = this.props;
    // 获取用户信息及要显示的导航信息;
    dispatch({
      type: 'user/fetch',
      payload: {
        type: 'user',
        userName: getAuthority(),
      },
    });

  }

  componentWillReceiveProps(nextProps) {
    const { user, location } = nextProps;
    const { purview } = user;
    const { pathname } = location;
    console.log(pathname)
    if (purview && pathname !== '/admin' && !pathname.match('403') && !pathname.match('dashboard')) {
      const purviewArray = purview.split(',');
      const path = pathname.split('/');
      const isPower = path.map(str =>
        purviewArray.some(k => k === str)
      ).some(c => c);
      if (!isPower) {
        router.push('/admin/403')
      }
    }
  }

  render() {
    const { loading } = this.props;
    if (loading || typeof loading === 'undefined') {
      return null;
    }
    return (
      <DocumentTitle title="后台管理系统 - 恩都法">
        <Layout style={{ minHeight: '100vh' }}>
          <Sider
            collapsible
            trigger={null}
          >
            <MenuNav />
          </Sider>
          <Layout>
            <Header />
            <Content>
              {this.props.children}
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              Ant Design ©2019 Created by JLJSJ
          </Footer>
          </Layout>
        </Layout>
      </DocumentTitle>
    );
  }
}

export default AdminLayout;