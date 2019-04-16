import React from 'react';
import { connect } from 'dva';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import { Icon, Row, Col } from 'antd';
import Page from '../component/Page';
import styles from './Contact.less';

const t = {
  tel: { icon: <Icon type="phone" />, color: '#2242BE', v: 0 },
  fax: { icon: <Icon type="printer" />, color: '#1890FF', v: 1 },
  mail: { icon: <Icon type="mail" />, color: '#0EDEDE', v: 2 },
  slogan: { v: 3 }
}

@connect(({ basic, loading }) => {
  return {
    contact: basic.basic.all.find(c => c.key === 'contact'),
    loading: loading.effects['basic/fetch'],
  };
})
class Contact extends React.PureComponent {
  render() {
    const { contact } = this.props;
    console.log(contact)
    const img = contact.values.find(c => c.key === 'image');
    const values = contact.values.filter(c => t[c.key]).sort((a, b) => t[a.key].v - t[b.key].v);
    console.log(values)
    return (
      <div>
        <OverPack
          component={Page}
          titleProps={{
            name: '联系我们',
            nameEn: 'CONTACT US',
          }}
          className={styles.wrapper}
          id="联系我们"
        >
          <TweenOne key="img"
            animation={{ y: '+=30px', opacity: 0, type: 'from', delay: 300, ease: 'easeOutCirc' }}
          >
            <img src={img.value} width="100%" />
          </TweenOne>
          <QueueAnim
            className={styles.contactWrapper}
            type="bottom"
            leaveReverse
            key="queue"
            component={Row}
            delay={100}
          >
            {values.map((item, i) => {
              const iconComp = t[item.key].icon;
              const color = t[item.key].color;
              return (
                <Col md={6} key={i.toString()} className={styles.block}>
                  {iconComp ? (
                    <div className={styles.iconWrapper}>
                      <div className={styles.icon} style={{ backgroundColor: color }}>
                        {iconComp}
                      </div>
                    </div>
                  ) : null}
                  <div className={styles.textWrapper}>
                    {iconComp ? <h2>{item.name}</h2> : null}
                    <p>{item.value}</p>
                  </div>
                </Col>
              )
            })}
          </QueueAnim>
        </OverPack>
      </div>
    );
  }
}

export default Contact;
