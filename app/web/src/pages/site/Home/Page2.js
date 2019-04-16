import React from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import { Icon } from 'antd';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import QueueAnim from 'rc-queue-anim';
import classnames from 'classnames';
import MobileContext from '@/components/MobileContext';
import Page from '../component/Page';

import styles from './Page2.less';

@connect(({ news }) => {
  return {
    news: news.data,
  };
})
class Page2 extends React.PureComponent {
  state = {
    active: 0,
  }
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'news/fetch',
      payload: {
        page: 0,
        pageSize: 2,
        hot: true,
        show: true,
      }
    })
  }
  render() {
    const { news } = this.props;
    const { active } = this.state;
    return (
      <MobileContext.Consumer>
        {(isMobile) => (
          <OverPack
            component={Page}
            className={styles.wrapper}
            pageClassName={styles.page}
            titleProps={{ name: '最新资讯', nameEn: 'UP TO DATE NEWS' }}
          >
            <QueueAnim
              className={styles.cardWrapper}
              type="bottom"
              leaveReverse
              key="queue"
            >
              {news.map((item, i) => {
                const content = item.content.replace(/<[^>]*>|<\/[^>]*>/gm, '');
                let contentToRender = content.substring(0, 60);
                contentToRender = content.length > contentToRender.length ? `${contentToRender}...` : contentToRender;
                const wrapperClassName = classnames(styles.card, {
                  [styles.active]: isMobile || i === active,
                })
                return (
                  <div
                    className={wrapperClassName}
                    key={item.index.toString()}
                    onMouseEnter={!isMobile ? () => {
                      if (i !== this.state.active) {
                        this.setState({
                          active: i,
                        });
                      }
                    } : null}
                  >
                    <div className={styles.imageWrapper}>
                      <img src={item.image} height="100%" />
                    </div>
                    <div className={styles.titleWrapper}>
                      <p className={styles.time}>{item.date.split('-').filter((c, i) => i).join('/')}</p>
                      <h3>{item.name_en}</h3>
                      <h2>{item.name}</h2>
                      <p className={styles.content}>{contentToRender}</p>
                      <div className={styles.more}>
                        <Link to={`/news/${item.index}`}>
                          <span style={{ marginRight: 8 }}>查看详情</span>
                          <Icon type="arrow-right" />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </QueueAnim>
          </OverPack>
        )}
      </MobileContext.Consumer>
    );
  }
}

export default Page2;
