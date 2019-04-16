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
        title: '英文名称',
        dataIndex: 'name_en',
      },
    ];
  }

  render() {
    const { itemList, loading } = this.props;
    const data = itemList.map(item => {
      return {
        key: item.index,
        name: item.name,
        name_en: item.name_en,
      }
    });
    return (
      <ListBasic
        dataSource={data}
        columns={this.columns}
        headerProps={{
          title: '产品分类编辑',
          content: '编辑产品分类。',
        }}
        loading={loading}
        pageSize={pageSize}
      />
    );
  }
}

export default Classify;
