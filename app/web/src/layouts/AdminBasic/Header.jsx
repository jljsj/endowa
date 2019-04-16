import React, { PureComponent } from 'react';
import { Layout, Dropdown, Menu, Icon } from 'antd';
import Link from 'umi/link';
import { connect } from 'dva';

import styles from './Header.less';

const { Header } = Layout;

@connect(({ user, loading }) => {
  return {
    user: user.currentUser.user,
    loading: loading.effects['user/fetch'],
  };
})
class HeaderView extends PureComponent {
  onMenuClick = (e) => {
    if (e.key === 'logout') {
      const { dispatch } = this.props;
      dispatch({
        type: 'login/logout',
      })
    }
  }
  render() {
    const { user } = this.props;
    const menu = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={this.onMenuClick}>
        {/*  <Menu.Item key="userCenter">
          <Icon type="user" />
          个人中心
        </Menu.Item>
        <Menu.Divider /> */}
        <Menu.Item key="logout">
          <Icon type="logout" />
          退出登录
        </Menu.Item>
      </Menu>
    );
    return (
      <Header className={styles.header} >
        <div className={styles.right}>
          <Link to="/" className={styles.back}>返回首页</Link>
          <Dropdown overlay={menu}>
            <div className={styles.user}>
              <span style={{ marginRight: 8 }}>{user.name}</span>
              <Icon type="caret-down" />
            </div>
          </Dropdown>
        </div>
      </Header>
    );
  }
}

export default HeaderView;
