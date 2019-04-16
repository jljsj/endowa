import React from 'react';
import { connect } from 'dva';
import { Row, Col } from 'antd';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import TweenOne from 'rc-tween-one';
import MobileContext from '@/components/MobileContext';
import Page from '../component/Page';

import styles from './Page3.less';

@connect(({ partner }) => {
  return {
    partner: partner.data,
  };
})
class Page3 extends React.PureComponent {
  state = {
    active: 0,
  }
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'partner/fetch',
      payload: {
        show: true,
      }
    })
  }
  getChildrenToRender = (isMobile) => {
    const { partner } = this.props;
    const num = isMobile ? 2 : 5;
    return partner.map((item, i) => {
      const delay = (i % num) * 100 + Math.floor(i / num) * 100;
      const ci = partner.length - 1 - i;
      const t = Math.floor(ci / num);
      const reverseDelay = t * 100 + (num - i % num) * 100;
      return (
        <TweenOne
          key={i.toString()}
          component={Col}
          componentProps={{ xs: 12, sm: 100 }}
          className={styles.blockWrapper}
          animation={{
            delay,
            y: 30,
            opacity: 0,
            type: 'from',
            ease: 'easeOutQuad',
          }}
          reverseDelay={reverseDelay}
        >
          {this.renderItem(item, false)}
        </TweenOne>
      );
    });
  };

  renderItem(item, mobile) {
    return (
      <a href={item.link} target="_blank">
        <img src={item.image} alt="img" height={mobile ? 32 : 48} />
      </a>
    );
  }
  render() {
    return (
      <MobileContext.Consumer>
        {(isMobile) => (
          <Page
            className={styles.wrapper}
            pageClassName={styles.page}
            titleProps={{ name: '合作伙伴', nameEn: 'BUSINESS PARTNERS' }}
          >
            <OverPack
              component={Row}
              className={styles.contentWrapper}
              playScale={0.3}
            >
              {this.getChildrenToRender(isMobile)}
            </OverPack>
          </Page>
        )}
      </MobileContext.Consumer>
    );
  }
}

export default Page3;
