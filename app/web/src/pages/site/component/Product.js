import React from 'react';
import { Row, Col } from 'antd';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import Link from 'umi/link';
import Page from './Page';

import styles from './Product.less';

export default class Product extends React.PureComponent {
  render() {
    const { product, titleProps, more, ...props } = this.props;
    const child = [
      <QueueAnim
        className={styles.cardWrapper}
        component={Row}
        componentProps={{ gutter: 32 }}
        type="bottom"
        leaveReverse
        key="queue"
      >
        {product.map(item => {
          return (
            <Col md={8} key={item.index.toString()}>
              <Link to={`/product/${item.index}`} className={styles.card}>
                <div className={styles.imageWrapper}><img src={item.image} height="100%" /></div>
                <div className={styles.titleWrapper}>
                  <i />
                  <h2>{item.name}</h2>
                  <h3>{item.name_en}</h3>
                </div>
              </Link>
            </Col>
          );
        })}
      </QueueAnim>,
      more && (<TweenOne
        key="t"
        animation={{ y: '+=30px', opacity: 0, type: 'from', delay: 300, ease: 'easeOutCirc' }}
        className={styles.buttonWrapper}
      >
        <Link to="/product" className={styles.button}>
          查看全部产品
      </Link>
      </TweenOne>)
    ];
    if (more) {
      return (
        <Page
          {...props}
          titleProps={titleProps}
        >
          {child}
        </Page>
      )
    }
    return (
      <OverPack
        {...props}
        component={Page}
        titleProps={titleProps}
      >
        {child}
      </OverPack >
    );
  }
}