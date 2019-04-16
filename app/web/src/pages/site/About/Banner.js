import { connect } from 'dva';
import { Row, Col, Icon } from 'antd';
import QueueAnim from 'rc-queue-anim';
import Link from 'rc-scroll-anim/lib/ScrollLink';
import Page from '../component/Page';
import styles from './Banner.less';

@connect(({ basic }) => {
  return {
    basic: basic.basic.all.find(c => c.key === 'basic'),
    service: basic.basic.all.find(c => c.key === 'about'),
  };
})
class Banner extends React.PureComponent {
  getClassifyToChildren = () => {
    return [
      { name: '了解我们', content: '团队成员、公司发展', id: '核心团队' },
      { name: '招贤纳士', content: '多个职位等你共创美好未来', id: '加入我们'},
      { name: '联系我们', content: '无论商务合作还是商务合作欢迎来撩' },
    ].map(item => {
      return (
        <QueueAnim component={Col} type="bottom" span={8} key={item.name} className={styles.block}>
          <Link key="link" to={item.id || item.name}>
            <h3>{item.name}</h3>
            <p>{item.content}</p>
            <div className={styles.icon}>
              <Icon type="down" />
            </div>
          </Link>
        </QueueAnim>
      )
    });
  }
  render() {
    const { basic, service } = this.props;
    const bannerBg = basic.values.find(c => c.key === 'aboutBanner').value;
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
