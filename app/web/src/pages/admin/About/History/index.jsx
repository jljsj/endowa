import React from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import { Switch } from 'antd';
import ListBasic from '@/components/ListBasic';


const pageSize = 5;

@connect(({ list, loading, routing }) => {
  return {
    itemList: list.itemList,
    location: routing.location,
    loading: loading.effects['list/fetch'] || loading.effects['list/sequence'],
  };
})
class History extends React.Component {
  state = {
    selectedRows: [],
    page: 0,
  }
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: '标题',
        dataIndex: 'title',
        render: (text, record) => (
          <Link
            to={`${this.props.location.pathname}/${record.key}`}
          >
            {text}
          </Link>
        )
      },
      {
        title: '介绍',
        dataIndex: 'introduce',
        width: '40%'
      },
      {
        title: '时间',
        dataIndex: 'time',
      },
      {
        title: '是否显示推荐的五个',
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
        path: 'history',
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
        title: item.title,
        introduce: item.introduce,
        time: item.time,
        hot: item.hot,
        show: item.show,
      }
    });
    return (
      <ListBasic
        dataSource={data}
        columns={this.columns}
        headerProps={{
          title: '发展历程编辑',
          content: '编辑发展历程。',
        }}
        loading={loading}
        pageSize={pageSize}
      />
    );
  }
}

export default History;
