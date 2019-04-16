import React from 'react';
import { connect } from 'dva';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import { Modal, Button } from 'antd';
import Page from '../component/Page';
import styles from './History.less';

@connect(({ history, loading }) => {
  return {
    history: [...history.data].reverse(),
    loading: loading.effects['list/fetch'],
  };
})
class History extends React.PureComponent {
  state = { show: false }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'history/fetch',
    });
  }

  onShowModel = () => {
    const { show } = this.state;
    this.setState({
      show: !show,
    });
  }

  render() {
    const { history } = this.props;
    return (<div>
      <OverPack
        component={Page}
        titleProps={{
          name: '发展历程',
          nameEn: 'REMARKABLE MILESTONES',
        }}
        className={styles.wrapper}
      >
        <QueueAnim
          className={styles.timelineWrapper}
          type="right"
          leaveReverse
          key="queue"
        >
          <i key="i" />
          {history.filter(c => c.hot).filter((c, i) => i <= 4).map((item, i) => {
            return (
              <div style={{ left: i * 210 }} className={!(i % 2) ? styles.top : styles.down} key={i.toString()}>
                {!!(i % 2) && <h2 className={styles.time}>{item.time.replace(/-/g, '.')}</h2>}
                <div className={styles.content}>{item.introduce}</div>
                {!(i % 2) && <h2 className={styles.time}>{item.time.replace(/-/g, '.')}</h2>}
              </div>
            );
          })}
        </QueueAnim>
        <TweenOne
          key="t"
          animation={{ y: '+=30px', opacity: 0, type: 'from', delay: 300, ease: 'easeOutCirc' }}
          className={styles.buttonWrapper}
        >
          <a className={styles.button} onClick={this.onShowModel}>
            查看全部
        </a>
        </TweenOne>
      </OverPack>
      <Modal
        title="发展历程"
        visible={this.state.show}
        onCancel={this.onShowModel}
        width={800}
        footer={[
          <Button key="back" onClick={this.onShowModel} type="primary">关闭</Button>,
        ]}
      >
        <div className={styles.modalWrapper}>
          {history.map((item, i) => (
            <div className={styles.modalContent} key={i.toString()}>
              <h2 >{item.title}<span className={styles.time}>{item.time.replace(/-/g, '.')}</span></h2>
              <div className={styles.content}>{item.introduce}</div>
            </div>)
          )}
        </div>
      </Modal>
    </div>);
  }
}

export default History;
