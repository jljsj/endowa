import React from 'react';
import { connect } from 'dva';
import Product from '../component/Product';

@connect(({ product }) => {
  return {
    product: product.hot,
  };
})
class Page1 extends React.PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'product/fetchHot',
      payload: {
        hot: true,
        show: true,
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
