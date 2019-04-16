import React from 'react';
import { connect } from 'dva';
import { Card, Button, message } from 'antd';
import Editor from '@/components/Editor';

import Wrapper from '@/components/ContentWrapper';


@connect(({ basic, loading }) => {
  return {
    basic: basic.basic,
    loading: loading.effects['basic/fetch'],
  };
})
class About extends React.Component {
  editValues = null;
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'basic/fetch',
      payload: {
        id: 'about',
      },
    });

  }

  onChange = (v) => {
    this.editValues = v;
  }

  onSave = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'basic/update',
      payload: {
        type: 'basicUpdate',
        id: 'about',
        values: this.editValues,
      }
    });
  }

  render() {
    const { loading, basic } = this.props;
    if (loading || typeof loading === 'undefined') {
      return null;
    }
    return (
      <Wrapper
        headerProps={{
          title: '关于我们编辑',
          content: '针对前台的关于我们。',
        }}
      >
        <Card bordered={false}>
          <Editor basicData={basic} onChange={this.onChange} />
          <div style={{ marginTop: 16, textAlign: 'center' }}>
            <Button type="primary" onClick={this.onSave}>保存</Button>
          </div>
        </Card>
      </Wrapper>
    );
  }
}

export default About;
