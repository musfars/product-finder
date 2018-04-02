import React, { Component } from 'react';
import { Button, Modal, Form, Input } from 'antd';
import { addProductToList } from '../../actions/addProduct';
import { connect } from 'react-redux';
import './add-product.css';
const FormItem = Form.Item;

const CollectionCreateForm = Form.create()(
  class extends Component {
    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title="Add a new product"
          okText="Add"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">
            <FormItem label="Product ID">
              {getFieldDecorator('productId', {
                rules: [{ required: true, message: 'Please input the id of the product!' }],
              })(
                <Input />
                )}
            </FormItem>
            <FormItem label="Product Name">
              {getFieldDecorator('name', {
                rules: [{ required: true, message: 'Please input the name of the product!' }],
              })(
                <Input />
                )}
            </FormItem>
            <FormItem label="Location">
              {getFieldDecorator('location', {
                rules: [{ required: true, message: 'Please input the location of the product!' }],
              })(
                <Input />
                )}
            </FormItem>
          </Form>
        </Modal>
      );
    }
  }
);

class AddProduct extends Component {
  state = {
    visible: false,
  };
  showModal = () => {
    this.setState({ visible: true });
  }
  handleCancel = () => {
    this.setState({ visible: false });
  }
  handleCreate = () => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      const productData = {
        "deviceId": this.props.deviceId,
        "productObj": {
          "productId": values.productId,
          "name": values.name,
          "location": values.location
        }
      }
      this.props.addProductToList(productData);
      form.resetFields();
      this.setState({ visible: false });
    });
  }
  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }
  render() {
    return (
      <div>
        <div className='add-product-button'>
          <Button type="primary" onClick={this.showModal}>Add Product</Button>
        </div>  
        <CollectionCreateForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addProductToList: (productData) => {
      dispatch(addProductToList(productData))
    }
  }
}

export default connect(null, mapDispatchToProps)(AddProduct);