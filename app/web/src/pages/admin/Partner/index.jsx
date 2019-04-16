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
class Partner extends React.Component {
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
        title: 'logo',
        dataIndex: 'image',
        width: '160px',
        render: (text, record) => (
          <Link to={`${this.props.location.pathname}/${record.key}`}>
            <img src={text} height="60" />
          </Link>
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
      }
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
        path: 'partner',
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
        image: item.image,
        show: item.show,
        link: item.link,
      }
    });
    return (
      <ListBasic
        dataSource={data}
        columns={this.columns}
        headerProps={{
          title: '合作伙伴编辑',
          content: '合作伙伴调整时可编辑。',
        }}
        loading={loading}
        pageSize={10}
      />
    );
  }
}

export default Partner;
