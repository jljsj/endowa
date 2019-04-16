import React from 'react';
import { connect } from 'dva';
import { Card, Form, Button, Input, message } from 'antd';
import router from 'umi/router';
import moment from 'moment';
import { formItemLayout, submitFormLayout, getId, getPaths } from '@/utils';

import Wrapper from '@/components/ContentWrapper';

const { Item } = Form;

const dateFormat = 'YYYY-MM-DD';

@connect(({ list, routing }) => {
  return {
    location: routing.location,
    currentItem: list.currentItem,
  };
})
@Form.create()
class NewData extends React.PureComponent {
  componentDidMount() {
    const { dispatch, location, isUser } = this.props;
    const paths = getPaths(location);
    const index = getId(location);
    if (index !== 'new') {
      dispatch({
        type: `list/fetchCurrent`,
        payload: {
          index,
          path: paths[paths.length - 2],
        }
      })
    }
    if (isUser) {
      dispatch({
        type: `list/fetch`,
        payload: {
          path: paths[paths.length - 2],
        }
      })
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, value) => {
      if (!err) {
        const { dispatch, location, itemData, page, pageSize, isNew } = this.props;
        const paths = getPaths(location);
        const isDates = Object.keys(value).map(key => {
          const item = itemData.find(c => c.key === key);
          if (item.isDate) {
            return key
          }
        }).filter(c => c);
        isDates.forEach(key => {
          value[key] = value[key].format(dateFormat);
        })
        const id = isNew ? null : paths[paths.length - 1];
        const path = paths[paths.length - 2];
        let obj = isNew ?
          {
            type: `list/create`,
            payload: {
              type: 'create',
              value,
              path,
              page: 0,
              pageSize,
            },
          } :
          {
            type: 'list/update',
            payload: {
              type: 'update',
              id,
              path,
              page,
              pageSize,
              item: value,
            }
          }
        dispatch(obj);
        this.gotoBack();
      }
    });
  }

  gotoBack = () => {
    const paths = getPaths(this.props.location);
    router.push(paths.filter((_, i) => i < paths.length - 1).join('/'));
  }

  render() {
    const { currentItem, isLoading, isNew, headerProps, itemData } = this.props;
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Wrapper
        headerProps={headerProps}
      >
        <Card>
          {!isLoading && (
            <Form onSubmit={this.handleSubmit}>
              {itemData.map(item => {
                const props = {
                  style: { maxWidth: 840 },
                };
                const options = {};
                if (item.component &&
                  item.component.componentName === 'Editor'
                ) {
                  props.basicData = !isNew ? { values: currentItem[item.key] } : {};
                } else {
                  const value = item.isDate ? moment(currentItem[item.key], dateFormat) : currentItem[item.key];
                  
                  const defaultData = item.isDate ? moment(item.default, dateFormat) : item.default;
                  options.initialValue = !isNew ? value || defaultData : defaultData;
                  if (typeof item.default === 'boolean') {
                    options.valuePropName = 'checked';
                    options.initialValue = !!options.initialValue;
                  }
                  options.rules = item.rules || [];
                }
                return (
                  <Item label={item.name} {...formItemLayout} key={item.key}>
                    {getFieldDecorator(item.key, options)(
                      React.createElement(item.component || Input, props)
                    )}
                  </Item>
                );
              })}
              <Item {...submitFormLayout}>
                <Button type="primary" htmlType="submit">提交</Button>
                <Button onClick={this.gotoBack} style={{ marginLeft: 16 }}>返回</Button>
              </Item>
            </Form>
          )}
        </Card>
      </Wrapper>
    );
  }
}

export default NewData;
