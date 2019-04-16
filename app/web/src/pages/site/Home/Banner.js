import React from 'react';
import TweenOne from 'rc-tween-one';
import Texty from 'rc-texty';
import { connect } from 'dva';
import { Icon } from 'antd';
import styles from './Banner.less';


@connect(({ basic }) => {
  return {
    basic: basic.basic.all.find(c => c.key === 'basic'),
  };
})
class Banner extends React.PureComponent {
  render() {
    const { basic } = this.props;
    const bannerBg = basic.values.find(c => c.key === 'homeBanner').value;
    const title = basic.values.find(c => c.key === 'bannerTitle').value;
    const text = basic.values.find(c => c.key === 'bannerText').value;
    return (
      <div className={styles.bannerWrapper} style={{ backgroundImage: `url(${bannerBg})` }}>
        <div className={styles.bannerText}>
          <div>
            <Texty ease="easeOutCirc" component="h1" type="mask-bottom">{title}</Texty>
            <TweenOne animation={{ y: '+=30', opacity: 0, type: 'from', delay: 700, ease: 'easeOutCirc' }} component="p">{text}</TweenOne>
          </div>
        </div>
        <TweenOne
          animation={{ opacity: 0, type: 'from', delay: 400 }}
          className={styles.downWrapper}
        >
          <div key="down" className={styles.down}>
            <TweenOne animation={{
              y: 5, yoyo: true, repeat: -1, duration: 900,
            }}
            >
              <Icon type="down-circle-o" />
            </TweenOne>
          </div>
          <div
            className={styles.mouse}
            key="mouse"
          >
            <TweenOne
              className={styles.mouseBar}
              animation={{
                y: 5, yoyo: true, repeat: -1, duration: 900,
              }}
            />
          </div>
        </TweenOne>
      </div>
    );
  }
}

export default Banner;
