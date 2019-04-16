import React from 'react';
import { connect } from 'dva';
import { Input, Switch } from 'antd';
import { getId } from '@/utils';
import ImgUpload from '@/components/ImgUpload';
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
    key: 'name', name: '名称', rules,
  },
  { key: 'image', name: '图片', rules, component: ImgUpload },
  { key: 'hot', name: '是否显示推荐的三个', component: Switch, default: false },
  { key: 'show', name: '是否显示', component: Switch, default: true },
]

@connect(({ loading, list }) => {
  return {
    currentItem: list.currentItem,
    loading: loading.effects['list/fetchCurrent'],
  };
})
class HonorNew extends React.PureComponent {
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

export default HonorNew;
