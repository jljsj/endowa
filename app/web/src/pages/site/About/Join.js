import React from 'react';
import { connect } from 'dva';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import { Modal, Button, Row, Col } from 'antd';
import Page from '../component/Page';
import styles from './Join.less';

@connect(({ join, classify, loading }) => {
  return {
    join: join.data,
    classify: classify.data,
    loading: loading.effects['list/fetch'],
  };
})
class Join extends React.PureComponent {
  state = { show: false, data: {} }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'join/fetch',
    });
    dispatch({
      type: 'classify/fetch',
      payload: {
        path: 'postClassify',
      },
    });
  }

  onShowModel = (e, data) => {
    const { show } = this.state;
    const t = { show: !show, };
    if (data) {
      t.data = data;
    }
    this.setState(t);
  }
  render() {
    const { join, classify } = this.props;
    const { data } = this.state;
    const colors = ['#2242BE', '#1890FF', '#0EDEDE'];
    return (
      <div>
        <OverPack
          component={Page}
          titleProps={{
            name: '加入我们',
            nameEn: 'JOIN OUR TEAM',
          }}
          className={styles.wrapper}
          id="加入我们"
        >
          <QueueAnim
            type="bottom"
            leaveReverse
            key="queue"
            component={Row}
            componentProps={{ gutter: 32 }}
          >
            {classify.map((item, i) => {
              const children = join.filter(c => c.classify === item.classify.toString())
                .map((c, ii) => (<Row
                  key={ii.toString()}
                  onClick={(e) => {
                    this.onShowModel(e, c);
                  }}
                  className={styles.listWrapper}
                >
                  <Col span={16} className={styles.listPoint}>{c.name}</Col>
                  <Col span={8}>{c.salary}</Col>
                </Row>));
              return (
                <Col md={8} className={styles.card} key={i.toString()}>
                  <h3 style={{ backgroundColor: colors[i % 3] }}>{item.name}</h3>
                  <div className={styles.content}>
                    <p className={styles.explain}>{item.condition}</p>
                    <div className={styles.list}>
                      {children}
                    </div>
                  </div>
                </Col>
              );
            })}
          </QueueAnim>
        </OverPack>
        <Modal
          title={data.name}
          visible={this.state.show}
          onCancel={this.onShowModel}
          width={800}
          footer={[
            <Button key="back" onClick={this.onShowModel} type="primary">关闭</Button>,
          ]}
        >
          <div>
            <h3>薪资</h3>
            <p style={{ marginBottom: 16 }}>{data.salary}</p>
            <h3>详细介绍</h3>
            <section dangerouslySetInnerHTML={{ __html: data.introduce }} />
          </div>
        </Modal>
      </div>
    );
  }
}

export default Join;
