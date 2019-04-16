import React from 'react';
import { connect } from 'dva';
import classnames from 'classnames';
import DocumentTitle from 'react-document-title';
import { getImg } from '../utils';
import styles from './UserLayout.less';

@connect(({ login, loading }) => {
  return {
    login,
    submitting: loading.effects['login/login'],
  };
})
class UserLayout extends React.PureComponent {
  render() {
    const { submitting, login } = this.props;
    const { status, type } = login;
    const isLoginError = !submitting && status === 'error' && type === 'account';
    const boxClass = classnames(styles.loginBox, {
      [styles.loginError]: isLoginError,
    });
    return (
      <DocumentTitle title="后台用户登入系统 - 恩都法">
        <div className={styles.wrapper}>
          <div className={styles.loginWrapper}>
            <div className={styles.title}>
              <div className={styles.logo}>
                <img src={getImg('logo.svg')} />
              </div>
              <div className={styles.introduction}>
                恩都法，为了绿色美好的未来
            </div>
            </div>
            <div className={boxClass}>
              {this.props.children}
            </div>
          </div>
          <div className={styles.footer}>
            Copyright © 2019 jljsj
          </div>
        </div>
      </DocumentTitle>
    )
  }
}

export default UserLayout;
