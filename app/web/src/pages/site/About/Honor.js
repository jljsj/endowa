import React from 'react';
import { connect } from 'dva';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import { Modal, Button, Row, Col } from 'antd';
import Page from '../component/Page';
import styles from './Honor.less';

@connect(({ honor, loading }) => {
  return {
    honor: honor.data,
    loading: loading.effects['list/fetch'],
  };
})
class Honor extends React.PureComponent {
  state = { show: false }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'honor/fetch',
    });
  }

  onShowModel = () => {
    const { show } = this.state;
    this.setState({
      show: !show,
    });
  }

  render() {
    const { honor } = this.props;
    return (<div>
      <OverPack
        component={Page}
        titleProps={{
          name: '企业荣誉',
          nameEn: 'CORPORATE HONOR',
        }}
        className={styles.wrapper}
      >
        <QueueAnim
          type="bottom"
          leaveReverse
          key="queue"
          component={Row}
          componentProps={{ gutter: 32 }}
        >
          {honor.filter((c) => c.hot).filter((c, i) => i <= 2).map((item, i) => {
            return (
              <Col md={8} key={i.toString()} className={styles.card}>
                <div className={styles.image}><img src={item.image} width="100%" /></div>
                <div className={styles.name}>{item.name}</div>
              </Col>
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
        title="企业荣誉"
        visible={this.state.show}
        onCancel={this.onShowModel}
        width={800}
        footer={[
          <Button key="back" onClick={this.onShowModel} type="primary">关闭</Button>,
        ]}
      >
        <Row className={styles.modalWrapper}>
          {honor.map((item, i) => (
            <Col md={8} className={styles.modalContent} key={i.toString()}>
              <div className={styles.image}><img src={item.image} width="100%" /></div>
              <div className={styles.name}>{item.name}</div>
            </Col>)
          )}
        </Row>
      </Modal>
    </div>);
  }
}

export default Honor;
