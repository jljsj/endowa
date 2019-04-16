import React from 'react';
import { connect } from 'dva';
import Product from '../component/Product';

@connect(({ product }) => {
  return {
    product: product.data,
  };
})
class Page1 extends React.PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'product/fetch',
      payload: {
        hot: true,
        show: true,
        page: 0,
        pageSize: 2,
      }
    })
  }
  render() {
    const { product } = this.props;
    return (
      <Product
        titleProps={{ name: '旗舰产品', nameEn: 'FLAGSHIP PRODUCTS' }}
        product={product}
        more
      />
    );
  }
}

export default Page1;
