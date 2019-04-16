import { connect } from 'dva';
import router from 'umi/router';
import { Spin, PageHeader, Row, Col } from 'antd'
import QueueAnim from 'rc-queue-anim';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import { getId } from '@/utils';
import Page from '../component/Page';
import styles from './Detailed.less';

@connect(({ classify, product, loading }) => {
  return {
    classify: classify.data,
    current: product.currentItem || {},
    loading: loading.effects['product/fetchCurrent'],
  };
})
class Detailed extends React.PureComponent {
  componentDidMount() {
    const { dispatch, location } = this.props;
    const index = getId(location);
    dispatch({
      type: 'product/fetchCurrent',
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
        <OverPack component={Page} className={styles.wrapper} pageClassName={styles.page}>
          <PageHeader
            onBack={this.onBack}
            title={current.name}
            subTitle="详细介绍"
            style={{ marginBottom: 16 }}
          />
          {
            !isLoading && (
              <QueueAnim component={Row} key="1" type="bottom" leaveReverse gutter={48}>
                <Col key="image" span={12}><img src={current.image} width="100%" /></Col>
                <Col span={12} key="content" className={styles.content}>
                  <h1>{current.name}</h1>
                  <h2>{current.name_en}</h2>
                  <div className={styles.text} dangerouslySetInnerHTML={{ __html: current.introduce }}></div>
                </Col>
              </QueueAnim>
            )
          }
        </OverPack>
      </Spin>
    );
  }
}

export default Detailed;
