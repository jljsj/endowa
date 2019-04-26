import React from 'react';
import { connect } from 'dva';
import { Select } from 'antd';
import { getPaths } from '@/utils';

const Option = Select.Option;

@connect(({ classify, routing }) => {
  return {
    classify: classify.data,
    location: routing.location,
  };
})
class ClassifySelect extends React.Component {
  static defaultProps = {
    onChange: () => { },
  }

  componentDidMount() {
    this.getCurrentData();
  }

  getCurrentData = () => {
    const { dispatch, location } = this.props;
    const paths = getPaths(location);
    dispatch({
      type: 'classify/fetch',
      payload: {
        type: 'getClassify',
        path: `${paths[paths.length - 2]}Classify`,
      },
    });
  }
  render() {
    const { classify, value } = this.props;
    console.log(value, classify)
    const defaultValue = classify.map(c => c.classify.toString()).findIndex(c => c === value) >= 0 ?
      value : '请选择...';
    return (
      <div>
        {classify.length ? (
          <Select defaultValue={defaultValue} style={{ width: 120 }} onChange={this.props.onChange}>
            {classify.map(item => (
              <Option key={item.classify.toString()} value={item.classify.toString()}>{item.name}</Option>
            ))}
          </Select>
        ) : '请先添加分类。'}
      </div>
    );
  }
}

export default ClassifySelect