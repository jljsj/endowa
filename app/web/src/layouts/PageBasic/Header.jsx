import React from 'react';
import { Menu } from 'antd';
import TweenOne from 'rc-tween-one';
import classnames from 'classnames';
import MobileMenu from 'rc-drawer';
import { getImg } from '@/utils';
import styles from './Header.less';
import Link from 'umi/link';
import MobileContext from '@/components/MobileContext';
const { Item } = Menu;

import 'rc-drawer/assets/index.css';

export default class Header extends React.Component {
  state = {
    show: false,
  }
  onClick = () => {
    const { show } = this.state;
    this.setState({
      show: !show,
    });
  }
  render() {
    const { currentClassName, pathname } = this.props;
    const { show } = this.state;
    const pathKey = pathname && pathname.split('/')[1];
    const className = classnames('page-wrapper', {
      [styles.header]: true,
      [styles.news]: currentClassName === 'news',
      [styles.home]: currentClassName === 'home',
      [styles.open]: show,
    });
    const MyMenu = (
      { mode }
    ) => (
        <Menu mode={mode || 'horizontal'} selectedKeys={[pathKey || 'home']}>
          <Item key="home">
            <a href="/">首页</a>
          </Item>
          <Item key="product">
            <a href="/product">产品服务</a>
          </Item>
          <Item key="news">
            <a href="/news">业界新闻</a>
          </Item>
          <Item key="about">
            <a href="/about">关于我们</a>
          </Item>
        </Menu>
      );

    return (
      <MobileContext.Consumer>
        {(isMobile) => (
          <TweenOne component='header' className={className} animation={{ opacity: 0, type: 'from' }}>
            <div className={`page ${styles.page}`}>
              <div className={styles.logo}>
                <img src={getImg(currentClassName === 'news' ? 'logo2.svg' : 'logo.svg')} />
              </div>
              <div className={styles.navWrapper}>
                {!isMobile ? (
                  <MyMenu />
                ) : (<div className={styles.mobileNavBar} onClick={this.onClick}>
                  <i className={styles.bar} />
                </div>)
                }
              </div>
            </div>
            {isMobile && (
              <MobileMenu width={250} placement='right' handler={null} open={show} onMaskClick={this.onClick}>
                <div className={styles.mobileNav}>
                <MyMenu mode="inline" />
                </div>
              </MobileMenu>
            )}
          </TweenOne>
        )}
      </MobileContext.Consumer>
    );
  }
}
