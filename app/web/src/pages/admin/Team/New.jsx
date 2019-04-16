import React from 'react';
import { connect } from 'dva';
import { Switch } from 'antd';
import { getId } from '@/utils';
import Editor from '@/components/Editor';
import ImgUpload from '@/components/ImgUpload';
import NewData from '@/components/NewData';

const rules = [
  {
    required: true,
    message: '此项必填, 请输入...',
  },
];

const teamData = [
  {
    key: 'name', name: '姓名', rules,
  },
  { key: 'name_en', name: '英文名字' },
  { key: 'image', component: ImgUpload, name: '头像', rules },
  { key: 'job', name: '职位' },
  // { key: 'synopsis', name: '简介', component: TextArea },
  { key: 'hot', name: '是否核心', component: Switch, default: true },
  { key: 'introduce', name: '详细介绍', component: Editor },
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
          title: !isNew ? `${!isLoading ? currentItem.name : ''}编辑` : '新增人员',
          content: '人员调整时可编辑。',
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
