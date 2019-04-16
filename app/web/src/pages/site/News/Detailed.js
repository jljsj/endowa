import { connect } from 'dva';
import router from 'umi/router';
import { Spin, PageHeader, Icon } from 'antd'
import QueueAnim from 'rc-queue-anim';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import { getId } from '@/utils';
import Page from '../component/Page';
import styles from './Detailed.less';

@connect(({ classify, news, loading }) => {
  return {
    classify: classify.data,
    current: news.currentItem || {},
    loading: loading.effects['news/fetchCurrent'],
  };
})
class Detailed extends React.PureComponent {
  componentDidMount() {
    const { dispatch, location } = this.props;
    const index = getId(location);
    dispatch({
      type: 'news/fetchCurrent',
      payload: {
        index,
      },
    });
  }
  onBack = () => {
    router.goBack();
  }
  render() {
    const { loading, current } = this.props;
    const isLoading = typeof loading !== 'boolean' || loading;
    return (
      <Spin spinning={isLoading}>
        <div style={{ overflow: 'hidden'}}>
          <PageHeader
            onBack={this.onBack}
            title={current.name}
            subTitle="新闻详细"
            style={{ marginBottom: 16 }}
            className={styles.pageHeader}
          />
          <OverPack component={Page} className={styles.wrapper} pageClassName={styles.page}>
            {
              !isLoading && (
                <QueueAnim key="1" type="bottom" leaveReverse gutter={48}>
                  <div span={12} key="content" className={styles.content}>
                    <h1>{current.name}</h1>
                    <div className={styles.time}><Icon type="calendar" theme="filled" />{' '}{current.date}</div>
                    <i className={styles.line} />
                    <div key="image" className={styles.image}>
                      <img src={current.image} height="100%" />
                    </div>
                    <div className={styles.text} dangerouslySetInnerHTML={{ __html: current.content }}></div>
                  </div>
                </QueueAnim>
              )
            }
          </OverPack>
        </div>
      </Spin>
    );
  }
}

export default Detailed;
