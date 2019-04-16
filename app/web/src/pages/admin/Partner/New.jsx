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
    key: 'name', name: '名称', rules,
  },
  { key: 'image', component: ImgUpload, name: 'logo 图片', rules },
  { key: 'link', name: '链接地址', rules },
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
          title: !isNew ? `${!isLoading ? currentItem.name : ''}编辑` : '新增合作伙伴',
          content: '合作伙伴调整时可编辑。',
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
