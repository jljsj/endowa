import React from 'react';
import { connect } from 'dva';
import { Input, Form, Button, Card, Icon, Modal } from 'antd';
import Wrapper from '@/components/ContentWrapper';
import AddBasic from '@/components/AddBasic';
import ImgUpload from '@/components/ImgUpload';
import { formItemLayout, submitFormLayout } from '@/utils';
import styles from './BasicForm.less';

const { TextArea } = Input;
const { Item } = Form;


@connect(({ basic, user, loading }) => {
  return {
    userName: user.currentUser.user.name,
    basic: basic.basic,
    loading: loading.effects['basic/fetch'],
  };
})
@Form.create()
class BasicForm extends React.Component {
  static defaultProps = {
    id: 'basic',
    headerProps: {
      title: '基本内容编辑',
      content: '针对前台的图片和文字编辑。',
    },
  }
  state = {
    showAddModule: false,
  }
  componentDidMount() {
    const { dispatch, id } = this.props;
    dispatch({
      type: 'basic/fetch',
      payload: {
        id,
      },
    });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, v) => {
      if (!err) {
        const { basic, dispatch, id } = this.props;
        const values = basic.values.map(item => {
          const $item = { ...item };
          Object.keys(v).forEach(key => {
            if ($item.key === key) {
              $item.value = v[key];
            }
          });
          return $item;
        });
        dispatch({
          type: 'basic/update',
          payload: {
            type: 'basicUpdate',
            id,
            values,
          },
        });
      }
    });
  }
  add = (e) => {
    this.setState({
      showAddModule: true,
    });
  }

  handleCancel = () => {
    this.setState({
      showAddModule: false,
    });
  }
  onRemove = (key) => {
    const { basic, dispatch, id } = this.props;
    const { values } = basic;
    const $values = values.filter(item => item.key !== key);
    dispatch({
      type: 'basic/update',
      payload: {
        type: 'basicUpdate',
        id,
        values: $values,
      },
      messages: '删除成功',
    });
  }

  render() {
    const { form, loading, basic, userName, dispatch, headerProps, id } = this.props;
    if (loading || typeof loading === 'undefined') {
      return null;
    }
    const { values } = basic;
    if (typeof values !== 'object') {
      return null;
    }
    const {
      getFieldDecorator
    } = form;
    return (
      <Wrapper
        style={{ padding: 24, background: '#fff' }}
        headerProps={headerProps}
      >
        <Form onSubmit={this.handleSubmit}>
          <Card bordered={false}>
            {values.map(item => {
              const style = { width: '80%' };
              let children = item.type === 'textarea' ? <TextArea style={style} /> : <Input style={style} />;
              children = item.type === 'image' ? <ImgUpload style={style} /> : children;
              return (
                <Item {...formItemLayout} label={item.name} key={item.key}>
                  {getFieldDecorator(item.key, {
                    initialValue: item.value
                  })(children)}
                  {
                    userName === 'global' && (
                      <Icon
                        className={styles.removeIcon}
                        type='minus-circle-o'
                        onClick={() => { this.onRemove(item.key) }}
                      />
                    )
                  }
                </Item>
              );
            })}
            {
              userName === 'global' && (
                <Item {...submitFormLayout}>
                  <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
                    <Icon type="plus" /> 添加字段
                  </Button>
                </Item>
              )
            }
            <Item {...submitFormLayout}>
              <Button type="primary" htmlType="submit">保存</Button>
            </Item>
          </Card>
        </Form>
        {
          userName === 'global' && (
            <Modal
              title="添加参数"
              visible={this.state.showAddModule}
              onCancel={this.handleCancel}
              footer={null}
            >
              <AddBasic
                dispatch={dispatch}
                handleCancel={this.handleCancel}
                values={values}
                id={id}
              />
            </Modal>
          )
        }
      </Wrapper >
    );
  }
}

export default BasicForm;

