import React, { Component } from 'react';
import { enquireScreen } from 'enquire-js';
import { connect } from 'dva';
import DocumentTitle from 'react-document-title';
import { TweenOneGroup } from 'rc-tween-one';
import MobileContext from '@/components/MobileContext';
import Header from './PageBasic/Header';
import Footer from './PageBasic/Footer';

let isMobile;
enquireScreen((b) => {
  isMobile = b;
});

const title = {
  index: '首页',
  product: '产品中心',
  about: '关于我们',
  news: '新闻中心'
}

@connect(({ basic, loading }) => {
  return {
    basic: basic.basic.all,
    loading: loading.effects['basic/fetchAll'] || !basic.basic.all,
  };
})
class Layout extends Component {
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
      type: 'basic/fetchAll',
    });

  }

  render() {
    const { loading, location } = this.props;
    if (loading || typeof loading === 'undefined') {
      return null;
    }
    const { pathname } = location;
    const pathKey = pathname && pathname.split('/')[1];
    const key = !pathKey ? 'index' : pathKey;
    let className = key === 'index' ? 'home' : ''
    className = key === 'news' ? 'news' : className;
    return (
      <DocumentTitle title={`${title[key]} - 恩都法`}>
        <MobileContext.Provider value={this.state.isMobile}>
          <div className={className}>
            <Header currentClassName={className} pathname={pathname} />
            <TweenOneGroup
              className="content-wrapper"
              enter={{ type: 'from', opacity: 0, ease: 'easeOutQuart' }}
              leave={{ opacity: 0,  ease: 'easeOutQuart' }}
            >
              <div key={pathKey ? pathname : key}>
                {this.props.children}
              </div>
            </TweenOneGroup>
            <Footer />
          </div>
        </MobileContext.Provider>
      </DocumentTitle>
    );
  }
}

export default Layout;