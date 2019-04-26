import React from 'react';
import { connect } from 'dva';
import { Row, Col } from 'antd';
import { getPaths } from '@/utils';
import TagSelect from 'ant-design-pro/lib/TagSelect';

const { Option } = TagSelect;

@connect(({ classify, routing }) => {
  return {
    classify: classify.data,
    location: routing.location,
  };
})
class ClassifyTag extends React.Component {

  static defaultProps = {
    onClassifyChange: () => { },
  }

  constructor(props) {
    super(props);
    this.state = {
      values: null,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.classify !== nextProps.classify) {
      this.setState({
        values: nextProps.classify.map(item => item.classify),
      });
    }
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
        path: `${paths[paths.length - 1]}Classify`,
      },
    });
  }

  onChange = (value) => {
    const { values } = this.state;
    const $values = value.length ? value : values;
    this.setState({
      values: $values,
    }, () => {
      this.props.onClassifyChange($values);
    });
  }

  render() {
    const { classify } = this.props;
    const { values } = this.state

    return (
      <div>
        <span>
          分类选择：
        </span>
        <span style={{ display: 'inline-block', marginLeft: 16 }}>
          {classify.length ? (
            <TagSelect
              onChange={this.onChange}
              value={values}
            >
              {classify.map(item => (
                <Option key={item.classify} value={item.classify}>{item.name}</Option>
              ))}
            </TagSelect>
          ) : '请添加分类'}
        </span>
      </div >
    );
  }
}

export default ClassifyTag;
