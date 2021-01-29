import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Qs from 'qs'

import './product.css';

const columns = [
    { field: 'id', headerName: 'Batch ID', width: 175, sortable: false },
    { field: 'mfdate', headerName: 'Received Date', width: 165 },
    { field: 'quantity', headerName: 'Quantity', width: 165 }

];

var rows = [];

var list1 = [];



export default class ProductDetailsPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            issueproductdetails: []
        }
        this.viewissueproduct = this.viewissueproduct.bind(this)
        this.renderTableData = this.renderTableData.bind(this)
    }




    viewissueproduct() {
        if (list1.length > 0) {
            var apiBaseUrl = "https://prodrecallrest.azurewebsites.net/";
            axios.get(apiBaseUrl + 'productRecall', {
                params:
                {
                    "storeid": localStorage.getItem("storeID"),
                    "productid": localStorage.getItem("productID"),
                    "listbatch": list1
                },
                'paramsSerializer': function (params) {
                    return Qs.stringify(params, { arrayFormat: 'repeat' })
                }

            }

            )
                .then(response => {
                    if (response.status == 200 && (typeof response.data !== undefined) && response.data !== null) {
                        alert("Sending Notification SMS to the STORES to return the issued products")
                        this.setState({ issueproductdetails: list1 })
                        this.props.history.push({ pathname: '/login/productrecall', state: { data: this.state.issueproductdetails } })
                    } else {
                        alert("No data found");
                    }
                }

                )
        }
        else {
            alert("Please select the products");
        }
    }


    renderTableData() {
        rows = [];

        for (var i = 0; i < this.props.location.state.data.length; i++) {
            rows.push({
                id: this.props.location.state.data[i].batchnumber,
                mfdate: this.props.location.state.data[i].stockreceived,
                quantity: this.props.location.state.data[i].quantity
            })
        }
        return rows;
    }



    block() {
        if (list1.length > 0) {
            alert("The selected Batch of products has been blocked at the sale store");
        }
        else {
            alert("Please select the products");
        }
    }

    unblock() {
        if (list1.length > 0) {
            alert("The selected Batch of products has been unblocked at the sale store");
        }
        else {
            alert("Please select the products");
        }
    }

    order() {
        if (list1.length > 0) {
            alert("Sending Notification to ORDER MANAGEMENT SYSTEM to place a product replacement/refund request");
        }
        else {
            alert("Please select the products");
        }
    }
    onChangeFn = (e) => {

        list1 = e.rowIds;


    }



    render() {

        if (typeof this.props.location.state.data[0].storeid !== 'undefined' && typeof this.props.location.state.data[0].productid !== 'undefined'
            && typeof this.props.location.state.data[0].productname !== 'undefined') {
            localStorage.setItem("storeID", this.props.location.state.data[0].storeid);
            localStorage.setItem("productID", this.props.location.state.data[0].productid);
            localStorage.setItem("productName", this.props.location.state.data[0].productname);
            this.renderTableData();
        }

        return (

            <div className="body" >





                <div>
                    <h3 className="h1-title"> PRODUCT BATCH DETAILS </h3>


                </div>
                <br />
                <br />
                <br />
                <div style={{ width: '45%' }} className="center">
                    <span> <label id="labestyle">Product ID : </label>
                        <label>{localStorage.getItem("productID")}</label></span>
                    <span><label id="labestyle">Store ID : </label>
                        <label>{localStorage.getItem("storeID")}</label></span>
                    <span><label id="labestyle">Product Name :  </label>
                        <label>{localStorage.getItem("productName")}</label></span>


                </div><br /><br />

                <div style={{ height: 370, width: '45%' }} className="center">
                    <DataGrid rows={rows} columns={columns} pageSize={5} onSelectionChange={this.onChangeFn}
                        checkboxSelection />
                </div><br /><br />

                <br /><br />
                <div id="outer">
                    <span>
                        <div className="inner">

                            <Button onClick={this.block} variant="contained" color="inherit" style={{ display: "flex", margin: "auto", backgroundColor: "#d1e0e0" }} >Block Product</Button>

                        </div>
                    </span>
                    <span>
                        <div className="inner">

                            <Button onClick={this.unblock} variant="contained" color="inherit" style={{ display: "flex", margin: "auto", backgroundColor: "#d1e0e0" }} >Unblock Product</Button>
                        </div>
                    </span>

                    <span>
                        <div className="inner">
                            <Button onClick={this.order} variant="contained" color="inherit" style={{ display: "flex", margin: "auto", backgroundColor: "#d1e0e0" }} >Order Management System</Button>
                        </div>
                    </span>

                    <span>
                        <div className="inner">
                            <Button onClick={this.viewissueproduct} variant="contained" color="inherit" style={{ display: "flex", margin: "auto", backgroundColor: "#d1e0e0" }} >Product Recall</Button>
                        </div>
                    </span>

                </div>

            </div>



        );
    }
}
