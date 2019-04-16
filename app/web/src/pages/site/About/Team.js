import React from 'react';
import { connect } from 'dva';
import { Row, Col } from 'antd';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import QueueAnim from 'rc-queue-anim';
import Page from '../component/Page';
import styles from './Team.less'; 

@connect(({ list, loading }) => {
  return {
    team: list.data,
    loading: loading.effects['list/fetch'],
  };
})
class Team extends React.PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'list/fetch',
      payload: {
        path: 'team',
      },
    });
  }
  render() {
    const { team } = this.props;
    return (
      <OverPack
        component={Page}
        titleProps={{
          name: '核心团队',
          nameEn: 'CORE MEMBERS',
        }}
        id="核心团队"
        className={styles.wrapper}
      >
        <QueueAnim
          className={styles.cardWrapper}
          component={Row}
          componentProps={{ gutter: 32 }}
          type="bottom"
          leaveReverse
          key="queue"
        >
          {team.map(item => {
            return (
              <Col md={6} key={item.index.toString()}>
                <div className={styles.card}>
                  <div className={styles.imageWrapper}><img src={item.image} height="100%" /></div>
                  <div className={styles.titleWrapper}>
                    <h2>{item.name}</h2>
                    <h3>{item.name_en}</h3>
                    <div className={styles.job}>{item.job}</div>
                  </div>
                </div>
              </Col>
            );
          })}
        </QueueAnim>
      </OverPack>
    );
  }
}

export default Team;
