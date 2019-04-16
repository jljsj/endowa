import React from 'react';
import { connect } from 'dva';
import { Switch } from 'antd';
import { getId } from '@/utils';
import Editor from '@/components/Editor';
import ImgUpload from '@/components/ImgUpload';
import NewData from '@/components/NewData';
import PowerCheckboxGroup from '@/components/PowerCheckboxGroup';

const rules = [
  {
    required: true,
    message: '此项必填, 请输入...',
  },
];


@connect(({ loading, list }) => {
  return {
    itemList: list.itemList,
    currentItem: list.currentItem,
    loading: loading.effects['list/fetchCurrent'],
  };
})
class New extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  handleConfirmKey = (rule, value, callback) => {
    const { itemList } = this.props;
    if (itemList.some(item => (item.name === value))) {
      callback('用户名已经存在，请检查。')
    }
    callback();
  }
  render() {
    const { loading, currentItem, location } = this.props;
    const isNew = getId(location) === 'new';
    const teamData = [
      {
        key: 'name', name: '用户名', rules: [
          ...rules,
          isNew ? { validator: this.handleConfirmKey } : {}
        ],
      },
      {
        key: 'password', name: '密码', rules,
      },
      {
        key: 'purview', name: '权限', rules,
        component: PowerCheckboxGroup,
      }
    ]
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
        isUser
      />
    );
  }
}

export default New;
