import React from 'react';
import { Row, Col, Icon } from 'antd';
import { connect } from 'dva';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import Link from 'umi/link';
import MobileContext from '@/components/MobileContext';
import styles from './Footer.less';
import { getImg } from '@/utils';

const footerLeftData = [
  {
    title: '恩都法公司', children: [
      { name: '关于我们', props: { to: '/about' } },
      { name: '联系我们', props: { to: '/about#contact' } },
    ]
  },
]
@connect(({ basic, list, classify }) => {
  return {
    basic: basic.basic.all,
    newsClassify: classify.footerNewsClassify,
    productHot: list.hot || [],
  };
})
class Footer extends React.PureComponent {
  constructor(props) {
    super(props);
    props.dispatch({
      type: 'classify/footerFetch',
    });
    props.dispatch({
      type: 'list/fetchHot',
      payload: {
        path: 'product',
        hot: true,
        show: true,
      },
    });
  }
  render() {
    const { basic, productHot, newsClassify } = this.props;
    const hotProduct = {
      title: '热门产品',
      children: productHot.map(item => (
        { name: item.name, props: { to: `/product/${item.index}` } }
      )),
    };

    const newsClass = {
      title: '热门新闻',
      children: newsClassify.map(item => (
        { name: item.name, props: { to: { pathname: '/news', search: `?classify=${item.index}` } } }
      )),
    }
    const footerLeft = footerLeftData.concat(hotProduct, newsClass);
    const footerRight = basic.find(item => item.key === 'contact').values.filter(c => c.key === 'tel' || c.key === 'mail');

    return (
      <MobileContext.Consumer>
        {(isMobile) => (
          <OverPack component="footer" className={`page-wrapper ${styles.footer}`} playScale={0.1}>
            <QueueAnim type="bottom" leaveReverse component={Row} key="1" className={`page ${styles.page}`}>
              <Col md={14} className={!isMobile ? styles.dividerRight : ''} key="left">
                <QueueAnim type="bottom" component={Row}>
                  {
                    footerLeft.map(item =>
                      <Col md={8} key={item.title} className={styles.block}>
                        <h3>{item.title}</h3>
                        <ul>
                          {item.children.map(($item, i) => <li key={i.toString()}>
                            <Link {...$item.props}>{$item.name}</Link>
                          </li>)}
                        </ul>
                      </Col>
                    )
                  }
                </QueueAnim>
              </Col>
              {!isMobile && (<Col md={10} key="right">
                <QueueAnim type="bottom" component={Row} delay={300}>
                  {
                    footerRight.map(item => {
                      return (
                        <Col key={item.name} md={24 / footerRight.length} className={styles.contactWrapper}>
                          <div className={styles.icon}>
                            <Icon type={item.key === 'tel' ? 'phone' : item.key} />
                          </div>
                          <div className={styles.contact}>
                            <h3>{item.name}</h3>
                            <p style={{ marginBottom: 16 }}>{item.value}</p>
                            <h3>服务时间</h3>
                            <p>每周一至周五<br />09:00-18:00</p>
                          </div>
                        </Col>
                      )
                    })
                  }
                </QueueAnim>
              </Col>)}
            </QueueAnim>
            <i className={styles.divider} key="2" />
            <TweenOne animation={{ y: '+=30', opacity: 0, delay: 100, type: 'from' }} className={`page ${styles.copyright}`} key="3">
              {!isMobile ? [<span key="img"><img src={getImg('record.png')} width="18" /></span>,
              <span key="a">
                苏公网安备 3177010602009975 号
              </span>,
              <span key="b">
                Copyright © 2019 恩都法汽车系统有限公司 ｜ 苏ICP备 19022374 号
              </span>,
              <span key="c">
                <a>《恩都法隐私权政策》</a>
              </span>,
              <span key="d">
                <a>《恩都法客户权益保障承诺书》</a>
              </span>,
              ] : 'Copyright © 2018 恩都法汽车系统有限公司'}
            </TweenOne>
          </OverPack>
        )}
      </MobileContext.Consumer>
    );
  }
}

export default Footer;