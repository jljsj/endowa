import { connect } from 'dva';
import Link from 'umi/link';
import { Spin, Row, Col, Icon, Button } from 'antd';
import Page from '../component/Page';
import styles from './Page.less';

@connect(({ classify, news, loading, routing }) => {
  return {
    classify: classify.data,
    news: news.data,
    loading: loading.effects['news/fetch'],
    location: routing.location,
  };
})
class News extends React.Component {
  state = {
    pageSize: 5,
  }
  componentDidMount() {
    const { dispatch } = this.props;
    this.getNews();
    dispatch({
      type: 'classify/fetch',
      payload: {
        path: 'newsClassify',
      },
    });
  }
  componentDidUpdate(nextProps) {
    if (nextProps.location.search !== this.props.location.search) {
      this.setState({
        pageSize: 5,
      }, this.getNews);
    }
  }
  getNews = () => {
    const { dispatch, location } = this.props;
    const { pageSize } = this.state;
    const payload = {
      page: 0,
      pageSize
    };
    if (location.query.classify) {
      payload.classify = location.query.classify;
    }
    dispatch({
      type: 'news/fetch',
      payload,
    });
  }

  getMore = () => {
    const { pageSize } = this.state;
    this.setState({
      pageSize: pageSize + 6,
    }, this.getNews)
  }
  render() {
    const { classify, news, loading, location } = this.props;
    const { pageSize } = this.state;
    const noMore = news.length < pageSize + 1;
    return (
      <Page className={styles.wrapper} pageClassName={styles.page}>
        <div className={styles.navWrapper}>
          <Link to="/news" className={location.query.classify ? '' : styles.active}>全部新闻</Link>
          {classify.map(item => (
            <Link
              className={location.query.classify === item.classify.toString() ? styles.active : ''}
              key={item.name}
              to={{ pathname: '/news', search: `?classify=${item.classify}` }}
            >
              {item.name}
            </Link>
          ))}
        </div>
        <Spin spinning={!!loading}>
          <div>
            {news.length ? news.map(item => {
              const content = (item.content || '').replace(/<[^>]*>|<\/[^>]*>/gm, '');
              let contentToRender = content.substring(0, 120);
              contentToRender = content.length > contentToRender.length ? `${contentToRender}...` : contentToRender;
              return (
                <Row className={styles.card} key={item.index}>
                  <Col md={10} className={styles.image}>
                    {item.image ? (<img src={item.image} width="100%" />) : '暂无图片'}
                  </Col>
                  <Col md={14} className={styles.content}>
                    <Link to={`/news/${item.index}`}><h1>{item.name}</h1></Link>
                    <p className={styles.time}><Icon type="calendar" theme="filled" />{' '}{item.date}</p>
                    <div className={styles.text}>{contentToRender}</div>
                    <Link to={`/news/${item.index}`} className={styles.details}><Icon type="right" /> {' '}了解详情</Link>
                  </Col>
                </Row>
              );
            }) : <div className={styles.noContent}>
                <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNDEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCAxKSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgIDxlbGxpcHNlIGZpbGw9IiNGNUY1RjUiIGN4PSIzMiIgY3k9IjMzIiByeD0iMzIiIHJ5PSI3Ii8+CiAgICA8ZyBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0iI0Q5RDlEOSI+CiAgICAgIDxwYXRoIGQ9Ik01NSAxMi43Nkw0NC44NTQgMS4yNThDNDQuMzY3LjQ3NCA0My42NTYgMCA0Mi45MDcgMEgyMS4wOTNjLS43NDkgMC0xLjQ2LjQ3NC0xLjk0NyAxLjI1N0w5IDEyLjc2MVYyMmg0NnYtOS4yNHoiLz4KICAgICAgPHBhdGggZD0iTTQxLjYxMyAxNS45MzFjMC0xLjYwNS45OTQtMi45MyAyLjIyNy0yLjkzMUg1NXYxOC4xMzdDNTUgMzMuMjYgNTMuNjggMzUgNTIuMDUgMzVoLTQwLjFDMTAuMzIgMzUgOSAzMy4yNTkgOSAzMS4xMzdWMTNoMTEuMTZjMS4yMzMgMCAyLjIyNyAxLjMyMyAyLjIyNyAyLjkyOHYuMDIyYzAgMS42MDUgMS4wMDUgMi45MDEgMi4yMzcgMi45MDFoMTQuNzUyYzEuMjMyIDAgMi4yMzctMS4zMDggMi4yMzctMi45MTN2LS4wMDd6IiBmaWxsPSIjRkFGQUZBIi8+CiAgICA8L2c+CiAgPC9nPgo8L3N2Zz4K" />
                <p>暂无新闻</p>
              </div>}
            <div className={styles.more}>
              {noMore ? <p className={styles.moreText}>没有更多了</p> : <a className={styles.moreText} onClick={this.getMore}>点击查看更多新闻</a>}
            </div>
          </div>
        </Spin>
      </Page>
    );
  }
}

export default News;
