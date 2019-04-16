import React from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import ListBasic from '@/components/ListBasic';
// import PowerCheckboxGroup from '@/components/PowerCheckboxGroup';

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
        title: '用户名',
        dataIndex: 'name',
        render: (text, record) => (
          <Link
            to={`${this.props.location.pathname}/${record.key}`}
          >
            {text}
          </Link>
        )
      },
      /* {
        title: '权限',
        dataIndex: 'purview',
        width: '60%',
        render: (text, record) => (
          <PowerCheckboxGroup value={text}/>
        )
      }, */
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
        pageSize,
        item,
      }
    });
  }

  render() {
    const { itemList, loading } = this.props;
    const data = itemList.filter(item => item.name !== 'global').map(item => {
      return {
        key: item.index,
        name: item.name,
        // purview: item.purview,
      }
    });
    return (
      <ListBasic
        dataSource={data}
        columns={this.columns}
        headerProps={{
          title: '后台管理人员编辑',
          content: '管理人员调整时可编辑。',
        }}
        loading={loading}
        pageSize={10}
        isUser={true}
      />
    );
  }
}

export default Team;
