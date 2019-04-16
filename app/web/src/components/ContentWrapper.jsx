import React from 'react';
import PageHeader from 'ant-design-pro/lib/PageHeader';
import Link from 'umi/link';

class ContentWrapper extends React.Component {
  itemRender = ({ path, routes, title }) => {
    const last = routes.indexOf(path) === routes.length - 1;
    const paths = routes.filter((c, i) => i <= routes.indexOf(path));
    return last ? <span>{title}</span> : <Link to={paths.join('/')}>{title}</Link>;
  }
  render() {
    const { children, headerProps } = this.props;
    const { pathname } = location;
    const pathArray = pathname.split('/').filter(c => c);
    const routes = pathArray.map((key, i) => ({
      title: key,
      routes: pathname.split('/'),
      path: key,
    }));
    return (
      <div>
        <PageHeader
          breadcrumbList={routes}
          itemRender={this.itemRender}
          style={{ padding: 24, background: '#fff' }}
          {...headerProps}
        />
        <div style={{ margin: '24px 24px 0' }}>
          {children}
        </div>
      </div>
    );
  }
}

export default ContentWrapper;
