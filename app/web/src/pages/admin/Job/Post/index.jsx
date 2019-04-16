import React from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import { Switch } from 'antd';
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
class Honor extends React.Component {
  state = {
    selectedRows: [],
    page: 0,
  }
  constructor(props) {
    super(props);
    this.columns = [
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
        title: '薪资',
        dataIndex: 'salary',
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
        path: 'post',
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
        salary: item.salary,
        classify: item.classify,
        show: item.show,
      }
    });
    return (
      <ListBasic
        dataSource={data}
        columns={this.columns}
        headerProps={{
          title: '岗位编辑',
          content: '编辑岗位，选择分类将只显示当前分类的全部岗位。',
        }}
        loading={loading}
        pageSize={pageSize}
        classify={true}
      />
    );
  }
}

export default Honor;
