import React from 'react';
import { connect } from 'dva';
import { Row, Col, Checkbox } from 'antd';

const CheckboxGroup = Checkbox.Group;

const defaultValue = ['news', 'product', 'introduce', 'basic', 'team', 'service', 'contact', 'post', 'history', 'honor', 'newsClassify', 'postClassify', 'productClassify', 'partner'];
@connect(({ loading, user, routing }) => {
  return {
    navList: user.currentUser.navListAll,
  };
})
class PowerCheckboxGroup extends React.Component {
  render() {
    const { navList } = this.props;
    const options = Object.keys(navList).sort((a, b) => {
      const aItem = navList[a];
      const bItem = navList[b];
      return aItem.order - bItem.order;
    }).map(key => {
      const item = navList[key];
      return {
        label: item.name,
        value: item.key,
      };
    });
    console
    return (
      <CheckboxGroup
        options={options}
        defaultValue={this.props.value ? this.props.value.split(',') : defaultValue}
        onChange={(v) => {
          this.props.onChange(v.join(','));
        }}
      />
    );
  }
}

export default PowerCheckboxGroup