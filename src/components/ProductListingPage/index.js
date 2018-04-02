import React, { Component } from 'react';
import { listProductDetails } from '../../actions/listProductDetails';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import ProductListingTable from '../ProductListingTable';
import AddProduct from '../AddProduct';

class ProductListingPage extends Component {
  componentDidMount() {
    this.deviceId = this.props.match.params.id;
    this.props.listProductDetails(this.deviceId);
  }

  render() {
    if (!this.props.userDetails.loginStatus) {
      return (
        <Redirect to='/' />
      )
    }
    else {
      return (
        <div className="ProductDetails">
          <ProductListingTable data={this.props.productListing}/>
          <AddProduct deviceId={this.deviceId}/>
        </div>
      )
    }
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    listProductDetails: (deviceId) => {
      dispatch(listProductDetails(deviceId))
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    productListing: state.productListing,
    userDetails: state.userDetails
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductListingPage));