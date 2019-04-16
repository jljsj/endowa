import React from 'react';
import { connect } from 'dva';
import { Input } from 'antd';
import { getId } from '@/utils';
import NewData from '@/components/NewData';

const rules = [
  {
    required: true,
    message: '此项必填, 请输入...',
  },
];

const { TextArea } = Input

const teamData = [
  {
    key: 'name', name: '分类名称', rules,
  },
  { key: 'condition', name: '分类要求', rules, component: TextArea },
]

@connect(({ loading, list }) => {
  return {
    currentItem: list.currentItem,
    loading: loading.effects['list/fetchCurrent'],
  };
})
class New extends React.PureComponent {
  render() {
    const { loading, currentItem, location } = this.props;
    const isNew = getId(location) === 'new';
    const isLoading = !isNew && (loading || typeof loading === 'undefined');
    return (
      <NewData
        headerProps={{
          title: !isNew ? `${!isLoading ? currentItem.name || currentItem.title : ''}编辑` : '新增分类',
          content: '分类相关内容编辑。',
        }}
        isNew={isNew}
        isLoading={isLoading}
        itemData={teamData}
        pageSize={10}
      />
    );
  }
}

export default New;
