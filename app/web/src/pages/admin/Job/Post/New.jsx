import React from 'react';
import { connect } from 'dva';
import { Input, Switch } from 'antd';
import { getId } from '@/utils';
import ImgUpload from '@/components/ImgUpload';
import NewData from '@/components/NewData';
import Editor from '@/components/Editor';
import ClassifySelect from '@/components/ClassifySelect';

const rules = [
  {
    required: true,
    message: '此项必填, 请输入...',
  },
];

const { TextArea } = Input

@connect(({ loading, list, classify }) => {
  return {
    classify: classify.data,
    currentItem: list.currentItem,
    loading: loading.effects['list/fetchCurrent'],
  };
})
class New extends React.PureComponent {
  render() {
    const { loading, currentItem, location, classify } = this.props;
    const isNew = getId(location) === 'new';
    const isLoading = !isNew && (loading || typeof loading === 'undefined');
    const teamData = [
      { key: 'classify', name: '岗位分类', component: ClassifySelect, default: classify[0] ? classify[0].classify.toString() : null  },
      {
        key: 'name', name: '名称', rules,
      },
      { key: 'salary', name: '薪资', rules },
      { key: 'introduce', name: '岗位介绍', component: Editor },
      { key: 'show', name: '是否显示', component: Switch, default: true },
    ];
    return (
      <NewData
        headerProps={{
          title: !isNew ? `${!isLoading ? currentItem.name || currentItem.title : ''}编辑` : '新增岗位',
          content: '岗位编辑。',
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
