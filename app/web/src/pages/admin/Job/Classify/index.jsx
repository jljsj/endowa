import React from 'react';
import { connect } from 'dva';
import { Card, Switch, Tooltip, Button, message } from 'antd';
import Link from 'umi/link';
import ListBasic from '@/components/ListBasic';
import Wrapper from '@/components/ContentWrapper';
import Table from '@/components/TableWrapper';

const pageSize = 5;

@connect(({ list, loading, routing }) => {
  return {
    itemList: list.itemList,
    location: routing.location,
    loading: loading.effects['list/fetch'] || loading.effects['list/sequence'],
  };
})
class Classify extends React.Component {
  state = {
    selectedRows: [],
    page: 0,
  }
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: '分类名称',
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
        title: '分类要求',
        dataIndex: 'condition',
      },
    ];
  }

  render() {
    const { itemList, loading } = this.props;
    const data = itemList.map(item => {
      return {
        key: item.index,
        name: item.name,
        condition: item.condition,
      }
    });
    return (
      <ListBasic
        dataSource={data}
        columns={this.columns}
        headerProps={{
          title: '岗位分类编辑',
          content: '编辑岗位分类, 岗位的基本要求也是在这里编辑。',
        }}
        loading={loading}
        pageSize={pageSize}
      />
    );
  }
}

export default Classify;
