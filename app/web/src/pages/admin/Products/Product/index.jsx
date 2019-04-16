import React from 'react';
import { connect } from 'dva';
import { Switch } from 'antd';
import Link from 'umi/link';
import ListBasic from '@/components/ListBasic';

const pageSize = 5;

@connect(({ list, classify, loading, routing }) => {
  return {
    classify: classify.data,
    itemList: list.itemList,
    location: routing.location,
    loading: loading.effects['list/fetch'] || loading.effects['list/sequence'],
  };
})
class Product extends React.Component {
  state = {
    selectedRows: [],
    page: 0,
  }
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: '图片',
        dataIndex: 'image',
        width: '160px',
        render: (text, record) => (
          <Link to={`${this.props.location.pathname}/${record.key}`}>
            <img src={text} height="60" />
          </Link>
        )
      },
      {
        title: '名称',
        dataIndex: 'name',
        render: (text, record) => (
          <Link
            to={`${this.props.location.pathname}/${record.key}`}
          >
            {text}
          </Link>
        )
      },
      {
        title: '分类',
        dataIndex: 'classify',
        render: (text) => {
          const className = this.props.classify.find(item => item.classify.toString() === text);
          return className ? className.name : text;
        },
      },
      {
        title: '是否热门产品',
        dataIndex: 'hot',
        render: (text, record) => (
          <Switch size="small" checked={!!text} onChange={(e) => {
            this.onSwitch(record.key, e, 'hot');
          }} />
        )
      },
      {
        title: '是否显示',
        dataIndex: 'show',
        render: (text, record) => (
          <Switch size="small" checked={!!text} onChange={(e) => {
            this.onSwitch(record.key, e, 'show');
          }} />
        )
      },
    ];
  }

  onSwitch = (key, b, id) => {
    const { itemList, dispatch } = this.props;
    const item = itemList.find(c => c.index === key);
    item[id] = b ? 1 : 0;
    const { page } = this.state;
    dispatch({
      type: 'list/update',
      payload: {
        id: item.index,
        path: 'product',
        page,
        pageSize,
        item,
      }
    });
  }

  render() {
    const { itemList, loading } = this.props;
    const data = itemList.map(item => {
      return {
        key: item.index,
        name: item.name,
        image: item.image,
        classify: item.classify,
        show: item.show,
        hot: item.hot,
      }
    });
    return (
      <ListBasic
        dataSource={data}
        columns={this.columns}
        headerProps={{
          title: '产品编辑',
          content: '编辑产品，选择分类将只显示当前分类的全部产品。',
        }}
        loading={loading}
        pageSize={pageSize}
        classify={true}
      />
    );
  }
}

export default Product;
