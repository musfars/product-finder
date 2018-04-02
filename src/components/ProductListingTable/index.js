import React, { Component } from 'react';
import { Table, Input } from 'antd';
import './product-listing-table.css'

const EditableCell = ({ editable, value, onChange }) => (
  <div>
    {editable
      ? <Input style={{ margin: '-5px 0' }} value={value} onChange={e => onChange(e.target.value)} />
      : value
    }
  </div>
);

class ProductListingTable extends Component {
  constructor(props) {
    super(props);
    this.columns = [{
      title: 'Product ID',
      dataIndex: 'productId',
      width: '15%',
      align: 'center',
      render: (text, record) => this.renderColumns(text, record, 'productId'),
    }, {
      title: 'Product Name',
      dataIndex: 'name',
      width: '30%',
      align: 'center',
      render: (text, record) => this.renderColumns(text, record, 'name'),
    }, {
      title: 'Location',
      dataIndex: 'location',
      align: 'center',
      width: '40%',
      render: (text, record) => this.renderColumns(text, record, 'location'),
    }, {
      title: 'Operation',
      dataIndex: 'operation',
      align: 'center',
      render: (text, record) => {
        const { editable } = record;
        return (
          <div className="editable-row-operations">
            {
              editable ?
                <span>
                  <a style={{ marginRight: '8px' }} onClick={() => this.save(record.key)}>Save</a>
                  <a onClick={() => this.cancel(record.key)}>Cancel</a>
                </span>
                : <a onClick={() => this.edit(record.key)}>Edit</a>
            }
          </div>
        );
      },
    }];    
    this.state = { data: [] };
  }

  renderColumns(text, record, column) {
    return (
      <EditableCell
        editable={record.editable}
        value={text}
        onChange={value => this.handleChange(value, record.key, column)}
      />
    );
  }

  handleChange(value, key, column) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      target[column] = value;
      this.setState({ data: newData });
    }
  }

  edit(key) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      target.editable = true;
      this.setState({ data: newData });
    }
  }

  save(key) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      delete target.editable;
      this.setState({ data: newData });
      this.cacheData = newData.map(item => ({ ...item }));
    }
  }

  cancel(key) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      Object.assign(target, this.cacheData.filter(item => key === item.key)[0]);
      delete target.editable;
      this.setState({ data: newData });
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      data: nextProps.data.map(item => ({ ...item, key: item.productId }))
    });
    this.cacheData = this.state.data.map(item => ({ ...item }));
  }

  render() {
    return(
      <div className='product-listing-table'>
        <Table bordered dataSource={this.state.data} columns={this.columns}
          title={() => <div style={{ textAlign: 'center', fontWeight: 'bold' }}>
          List of Products
          </div>} pagination={false}/>
      </div>
    )
  }
}

export default ProductListingTable;
