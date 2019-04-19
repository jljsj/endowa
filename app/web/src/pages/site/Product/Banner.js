import { connect } from 'dva';
import { Row, Col, Icon } from 'antd';
import QueueAnim from 'rc-queue-anim';
import Link from 'rc-scroll-anim/lib/ScrollLink';
import Page from '../component/Page';
import styles from './Banner.less';

@connect(({ basic, classify, list, routing }) => {
  return {
    classify: classify.data,
    product: list.data,
    basic: basic.basic.all.find(c => c.key === 'basic'),
    service: basic.basic.all.find(c => c.key === 'service'),
    location: routing.location,
  };
})
class Banner extends React.PureComponent {
  getClassifyToChildren = () => {
    const { classify, product, location } = this.props;
    const keys = location.pathname.split('/')
    const show = keys[keys.length - 1] === 'product';
    const length = classify.length;
    return classify.map(item => {
      const productLength = (product.filter(c => c.classify === item.classify.toString())).length;
      return (
        <QueueAnim component={Col} type="bottom" span={Math.round(24 / length)} key={item.index} className={styles.block}>
          {show && <Link key="link" to={item.name}>
            <h3>{item.name}</h3>
            <p>已有 {productLength} 种专业{item.name}可提供选择</p>
            <div className={styles.icon}>
              <Icon type="down" />
            </div>
          </Link>}
        </QueueAnim>
      )
    });
  }
  render() {
    const { basic, service } = this.props;
    const bannerBg = basic.values.find(c => c.key === 'product_banner_image').value;
    return (
      <div className={styles.wrapper} style={{ backgroundImage: `url(${bannerBg})` }}>
        <div className={styles.textWrapper}>
          <h1>{service.name}</h1>
          <div className={styles.content} dangerouslySetInnerHTML={{ __html: service.values }} />
        </div>
        <Page className={styles.bottomWrapper} pageClassName={styles.page}>
          <Row>
            {this.getClassifyToChildren()}
          </Row>
        </Page>
      </div>
    );
  }
}

export default Banner;
