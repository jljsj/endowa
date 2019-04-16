import React from 'react';
import { connect } from 'dva';
import { Menu } from 'antd';
import Link from 'umi/link';

import styles from './Menu.less';

const { SubMenu } = Menu;

@connect(({ user, loading, routing }) => {
  return {
    user: user.currentUser,
    location: routing.location,
    navList: user.currentUser.navList,
    loading: loading.effects['user/fetch'],
  };
})
class MenuNav extends React.Component {
  getMenuList = (list) => {
    const listArray = [];
    const sub = {};
    // 合并公司内容;
    list.forEach(item => {
      if (item.category) {
        sub[item.category] = sub[item.category] || [];
        !sub[item.category].length && listArray.push(
          <SubMenu key={item.category} title={item.categoryName}>
            {sub[item.category]}
          </SubMenu>
        );
        sub[item.category].push(
          <Menu.Item key={item.key}>
            <Link to={`/admin/${item.category}/${item.key}`}>{item.name}</Link>
          </Menu.Item>
        )
      } else {
        listArray.push((
          <Menu.Item key={item.key}>
            <Link to={`/admin/${item.key}`}>{item.name}</Link>
          </Menu.Item>
        ));
      }
    });
    return listArray;
  }

  getSelectedMenuKeys = (pathname) => {
    const pathArray = pathname.split('/');
    return [pathArray[pathArray.length - 1]]
  }

  getOpenKeys = (pathname) => {
    const pathArray = pathname.split('/');
    if (pathArray.length > 1) {
      return [pathArray[0]]
    }
    return null;
  }

  render() {
    const { navList, location } = this.props;
    const menuList = [
      <Menu.Item key='dashboard'>
        <Link to="/admin/dashboard">首页</Link>
      </Menu.Item>
    ].concat(this.getMenuList(navList));
    const { pathname } = location;
    const path = pathname.replace(/\/(admin|\d|new$)+\/?/ig, '');
    const selectedKeys = this.getSelectedMenuKeys(path);
    const defaultOpenKeys = this.getOpenKeys(path);
    return (
      <div>
        <div className={styles.logo} >后台管理系统</div>
        <Menu
          theme="dark"
          selectedKeys={selectedKeys}
          mode="inline"
          defaultOpenKeys={defaultOpenKeys}
        >
          {menuList}
        </Menu>
      </div>
    );
  }
}

export default MenuNav;
