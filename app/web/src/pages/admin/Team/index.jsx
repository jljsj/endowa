import React from 'react';
import { connect } from 'dva';
import { Switch } from 'antd';
import Link from 'umi/link';
import ListBasic from '@/components/ListBasic';


@connect(({ list, loading, routing }) => {
  return {
    itemList: list.itemList,
    location: routing.location,
    loading: loading.effects['list/fetch'] || loading.effects['list/sequence'],
  };
})
class Team extends React.Component {
  state = {
    selectedRows: [],
    page: 0,
  }
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: '姓名',
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
        title: '职位',
        dataIndex: 'job',
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
      {
        title: '是否核心人才',
        dataIndex: 'hot',
        render: (text, record) => (
          <Switch size="small" checked={!!text} onChange={(e) => {
            this.onSwitch(record.key, e, 'hot');
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
        path: 'team',
        page,
        pageSize: 10,
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
        job: item.job,
        show: item.show,
        hot: item.hot,
      }
    });
    return (
      <ListBasic
        dataSource={data}
        columns={this.columns}
        headerProps={{
          title: '团队人员编辑',
          content: '人员调整时可编辑。',
        }}
        loading={loading}
        pageSize={10}
      />
    );
  }
}

export default Team;
