import React from 'react';
import { Input, Form, Button, Radio } from 'antd';

const { Item } = Form;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};
const submitFormLayout = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 10, offset: 6 },
  },
};

@Form.create()
class AddBasic extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, v) => {
      if (!err) {
        const { dispatch, values, handleCancel, id } = this.props;
        const $values = [...values];
        $values.push(
          { ...v, values: '' },
        );
        dispatch({
          type: 'basic/update',
          payload: {
            type: 'basicUpdate',
            values: $values,
            id,
          },
          messages: '添加成功',
        });
        handleCancel();
      }
    });
  }

  handleConfirmKey = (rule, value, callback) => {
    const { values } = this.props;
    if (values.some(item => (item.key === value))) {
      callback('key 已经存在，请检查。')
    }
    callback();
  }

  render() {
    const { form } = this.props;
    const {
      getFieldDecorator
    } = form;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item label="key" {...formItemLayout}>
          {getFieldDecorator('key', {
            rules: [
              { required: true, message: '请输入...' },
              { validator: this.handleConfirmKey }
            ],
          })(<Input placeholder="字段唯一标题, 不能与已有的相同" />)}
        </Form.Item>
        <Form.Item label="name" {...formItemLayout}>
          {getFieldDecorator('name', {
            rules: [{ required: true, message: '请输入...' }],
          })(<Input placeholder="字段名称" />)}
        </Form.Item>
        <Form.Item label="type" {...formItemLayout}>
          {getFieldDecorator('type', {
            initialValue: 'title',
          })(
            <Radio.Group>
              <Radio value="input">短文</Radio>
              <Radio value="textarea">长文</Radio>
              <Radio value="image">图片</Radio>
            </Radio.Group>
          )}
        </Form.Item>
        <Item {...submitFormLayout}>
          <Button type="primary" htmlType="submit">提交</Button>
        </Item>
      </Form>
    )
  }
}

export default AddBasic;
