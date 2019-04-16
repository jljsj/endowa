import { connect } from 'dva';
import ProductComp from '../component/Product';

@connect(({ classify, list, loading }) => {
  return {
    classify: classify.data,
    product: list.data,
    loading: loading.effects['list/fetch'],
  };
})
class Product extends React.PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'list/fetch',
      payload: {
        path: 'product',
      },
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
    return classify.map(item => {
      const products = product.filter(c => c.classify === item.classify.toString());
      return (
        <ProductComp
          titleProps={{ name: item.name, nameEn: item.name_en }}
          key={item.index.toString()}
          product={products}
          id={item.name}
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
