import React, { Component } from 'react';
import EditableCell from '../EditableCell';
import { Button, Table} from 'antd';
import { connect } from 'react-redux';
import { editDeviceName } from '../../actions/editDeviceName';
import './alexa-listing-table.css';

class AlexaListingTable extends Component {
  constructor(props) {
    super(props);
    this.columns = [{
      title: 'Device Name',
      dataIndex: 'name',
      width: '30%',
      align: 'center',
      render: (text, record) => (
        <EditableCell
          value={text}
          onChange={this.onCellChange(record.key, 'name')}
        />
      ),
    }, {
      title: 'Device ID',
      dataIndex: 'deviceId',
      align: 'center',
    }, {
      title: 'Explore ',
      align: 'center',
      render: ({ deviceId }) => <Button icon="folder-open" href={`/details/${deviceId}`} />
    }];

    this.state = {
      dataSource: []
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      dataSource: nextProps.alexaListing.map(item => ({ ...item, key: item.deviceId }))
    });
  }

  onCellChange = (key, dataIndex) => {
    return (value) => {
      const dataSource = [...this.state.dataSource];
      const target = dataSource.find(item => item.key === key);
      if (target) {
        target[dataIndex] = value;
        this.setState({ dataSource });
        const deviceId = target['deviceId'];
        this.props.editDeviceName(deviceId,value);
      }
    };
  }

  render() {
    const columns = this.columns;
    return (
      <div className='alexa-listing-table'>
        <Table bordered dataSource={this.state.dataSource} columns={columns}
          title={() => <div style={{ textAlign: 'center', fontWeight: 'bold' }}>List of Alexa Devices</div>}
          pagination={false}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    editDeviceName: (deviceId, value) => {
      dispatch(editDeviceName(deviceId, value))
    }
  }
}

export default connect(null, mapDispatchToProps)(AlexaListingTable);