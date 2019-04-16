import { connect } from 'dva';
import Wrapper from '@/components/ContentWrapper';


@connect(({ user }) => {
  return {
    user: user.currentUser.user,
  };
})
class Dashboard extends React.Component {
  render() {
    const { user } = this.props;
    return (
      <Wrapper
        headerProps={{
          title: `欢迎 ${user.name} 回来！！！`,
          content: '注：如需修改密码，请找管理员修改, 如果你是管理员请在后台用户管理里修改密码。'
        }}
      >
      </Wrapper>
    );
  }
}

export default Dashboard; 
