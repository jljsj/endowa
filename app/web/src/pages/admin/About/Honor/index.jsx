import React from 'react';
import { connect } from 'dva';
import {  Switch } from 'antd';
import Link from 'umi/link';
import ListBasic from '@/components/ListBasic';

const pageSize = 5;

@connect(({ list, loading, routing }) => {
  return {
    itemList: list.itemList,
    location: routing.location,
    loading: loading.effects['list/fetch'] || loading.effects['list/sequence'],
  };
})
class Honor extends React.Component {
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
        width: '120px',
        render: (text) => (
          <img src={text} height="60" />
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
        title: '是否显示推荐的三个',
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
        path: 'honor',
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
        hot: item.hot,
        show: item.show,
      }
    });
    return (
      <ListBasic
        dataSource={data}
        columns={this.columns}
        headerProps={{
          title: '企业荣誉编辑',
          content: '编辑企业荣誉。',
        }}
        loading={loading}
        pageSize={pageSize}
      />
    );
  }
}

export default Honor;
