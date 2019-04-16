import React from 'react';
import { connect } from 'dva';
import { DatePicker, Input, Switch } from 'antd';
import { getId } from '@/utils';
import NewData from '@/components/NewData';

const rules = [
  {
    required: true,
    message: '此项必填, 请输入...',
  },
];

const { TextArea } = Input;
const date = new Date();
const teamData = [
  {
    key: 'title', name: '标题', rules,
  },
  { key: 'introduce', name: '介绍', rules, component: TextArea },
  { key: 'time', name: '创建时间', component: DatePicker, isDate: true, default: `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}` },
  { key: 'hot', name: '是否显示推荐的五个', component: Switch, default: false },
  { key: 'show', name: '是否显示', component: Switch, default: true },
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
          title: !isNew ? `${!isLoading ? currentItem.name || currentItem.title : ''}编辑` : '新增事件',
          content: '每年的大事件编辑。',
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
