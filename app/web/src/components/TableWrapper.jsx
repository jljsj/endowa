import React from 'react';
import { Button, Table } from 'antd';

export default class TableWrapper extends React.Component {
  state = {
    selectedRows: []
  }
  rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      this.setState({
        selectedRows
      }, () => {
        this.props.onSelectRow && this.props.onSelectRow(selectedRows, selectedRowKeys);
      });
    },
    getCheckboxProps: record => ({
      name: record.name,
    }),
  };
  onRemoveAll = () => {
    const { selectedRows } = this.state;
    this.props.onRemoveAll(selectedRows.map(item => item.key));
  }
  render() {
    const { selectedRows } = this.state;
    const { onAdd, onRemoveAll, onSelectRow, ...rest } = this.props;
    return (
      <div>
        <div style={{ marginBottom: 16 }}>
          <Button icon="plus" type="primary" onClick={onAdd}>
            新建
            </Button>
          <Button
            disabled={!selectedRows.length}
            icon="delete"
            onClick={this.onRemoveAll}
            style={{ marginLeft: 16 }}
          >
            删除
          </Button>
        </div>
        <Table
          rowSelection={this.rowSelection}
          {...rest}
        />
      </div>
    );
  }
}