import React from 'react';
import { connect } from 'dva';
import { Card, Tooltip, Button, message } from 'antd';
import router from 'umi/router';

import { getPaths } from '@/utils';

import Wrapper from '@/components/ContentWrapper';
import Table from '@/components/TableWrapper';
import ClassifyTag from '@/components/ClassifyTag';

@connect(({ list, routing }) => {
  return {
    itemList: list.itemList,
    preItem: list.preItem,
    nextItem: list.nextItem,
    total: list.total,
    location: routing.location,
  };
})
class ListBasic extends React.Component {
  state = {
    selectedRows: [],
    page: 0,
    classify: [],
  }
  editTable = {
    title: '操作',
    key: 'edit',
    width: '160px',
    render: (_, record, index) => {
      const { itemList, preItem, nextItem, isUser } = this.props;
      return (<div>
        {!isUser && [
          <Tooltip title="向上移动" key="up">
            <Button
              shape="circle"
              icon="arrow-up"
              size="small"
              style={{ marginRight: 8 }}
              disabled={index === 0 && !preItem}
              onClick={() => {
                this.onUpdateOrder(record, 'up');
              }}
            />
          </Tooltip>,
          <Tooltip title="向下移动" key="down">
            <Button
              shape="circle"
              icon="arrow-down"
              size="small"
              disabled={index >= itemList.length - 1 && !nextItem}
              style={{ marginRight: 8 }}
              onClick={() => {
                this.onUpdateOrder(record, 'down');
              }}
            />
          </Tooltip>
        ]}
        <Tooltip title="编辑当前">
          <Button
            shape="circle"
            icon="edit"
            size="small"
            style={{ marginRight: 8 }}
            onClick={() => {
              this.onAdd(record.key);
            }}
          />
        </Tooltip>
        <Tooltip title="删除当前">
          <Button
            shape="circle"
            icon="delete"
            size="small"
            onClick={() => {
              this.onRemoveSelect([record.key]);
            }}
          />
        </Tooltip>
      </div>)
    }
  }

  componentDidMount() {
    this.getCurrentData();
  }

  getCurrentData = () => {
    const { dispatch, location, pageSize } = this.props;
    const { page, classify } = this.state;
    const paths = getPaths(location);
    dispatch({
      type: 'list/fetch',
      payload: {
        type: 'getItem',
        path: paths[paths.length - 1],
        page,
        pageSize,
        classify,
      },
    });
  }

  onRemoveSelect = (keys) => {
    const { dispatch, location, pageSize } = this.props;
    const { page } = this.state;
    const paths = getPaths(location);
    dispatch({
      type: 'list/remove',
      payload: {
        pageSize,
        path: paths[paths.length - 1],
        page,
        keys,
      },
    });
  }

  onUpdateOrder = (record, type) => {
    const { itemList, preItem, nextItem, dispatch, location, pageSize } = this.props;
    const i = itemList.findIndex((c) => c.index === record.key);
    const newI = type === 'up' ? i - 1 : i + 1;
    const currentItem = itemList[i];
    let newItem = newI < 0 ? preItem : itemList[newI];
    newItem = newI > itemList.length - 1 ? nextItem : newItem;
    const currentIndex = currentItem.index;
    const nextIndex = newItem.index;
    currentItem.index = nextIndex;
    newItem.index = currentIndex;
    const { page } = this.state;
    const paths = getPaths(location);
    dispatch({
      type: 'list/sequence',
      payload: {
        path: paths[paths.length - 1],
        pageSize,
        page,
        item: [
          newItem, currentItem,
        ],
      },
    });
  }

  onAdd = (key) => {
    router.push(`${this.props.location.pathname}/${typeof key === 'number' ? key : 'new'}`);
  }


  onClassifyChange = (classify) => {
    this.setState({
      classify,
    }, this.getCurrentData);
  }

  onPaginationClick = (page) => {
    this.setState({
      page: page - 1,
    }, this.getCurrentData)
  }

  render() {
    const { loading, headerProps, dataSource, total, columns, pageSize } = this.props;
    return (
      <Wrapper
        headerProps={headerProps}
      >
        {
          this.props.classify && (
            <Card style={{ marginBottom: 24 }}>
              <ClassifyTag onClassifyChange={this.onClassifyChange} />
            </Card>
          )
        }
        <Card>
          <Table
            dataSource={dataSource}
            columns={[...columns, this.editTable]}
            onRemoveAll={this.onRemoveSelect}
            onAdd={this.onAdd}
            loading={loading}
            pagination={{ total, pageSize, onChange: this.onPaginationClick }}
          />
        </Card>
      </Wrapper>
    );
  }
}

export default ListBasic;
