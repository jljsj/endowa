import { connect } from 'dva';
import ProductComp from '../component/Product';

@connect(({ classify, product, loading }) => {
  return {
    classify: classify.data,
    product: product.data,
    loading: loading.effects['product/fetch'],
  };
})
class Product extends React.PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'product/fetch',
    });
    dispatch({
      type: 'classify/fetch',
      payload: {
        path: 'productClassify',
      },
    });
  }
  getProductToRender = () => {
    const { classify, product } = this.props;
    return classify.map((item, i) => {
      const products = product.filter(c => c.classify === item.classify.toString());
      return (
        <ProductComp
          titleProps={{ name: item.name, nameEn: item.name_en }}
          key={item.index.toString()}
          product={products}
          id={item.name}
          closeTween={!i}
        />
      )
    })
  }
  render() {
    return (
      <div>
        {this.getProductToRender()}
      </div>
    );
  }
}

export default Product;
