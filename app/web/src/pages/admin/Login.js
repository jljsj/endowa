import { Form, Icon, Input, Button, Alert } from 'antd';
import { connect } from 'dva';
import styles from './Login.less';


@Form.create()
@connect(({ login, loading }) => {
  return {
    login,
    submitting: loading.effects['login/login'],
  };
})
class Index extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    const { dispatch } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);
        dispatch({
          type: 'login/login',
          payload: {
            type: 'account',
            ...values,
          },
        })
      }
    });
  }

  render() {
    const { form, submitting, login } = this.props;
    const { getFieldDecorator } = form;
    const { status, type } = login;
    const isLoginError = !submitting && status === 'error' && type === 'account';
    return (
      <div>
        <h2 className={styles.title}>后台管理登录</h2>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {
              isLoginError && (
                <Alert style={{ marginBottom: 16 }} message="请输入有效的账户和密码！" type="error" showIcon />
              )
            }
            {getFieldDecorator('userName', {
              rules: [
                { required: true, message: 'Please input your username!' },
              ],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [
                { required: true, message: 'Password must be at least 6 characters.' },
                { min: 6, message: 'Password must be at least 6 characters.' },
              ],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
            )}
          </Form.Item>
          <Form.Item className={styles.button}>
            <Button loading={submitting} type="primary" htmlType="submit" className="login-form-button">
              登录
          </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
export default Index;