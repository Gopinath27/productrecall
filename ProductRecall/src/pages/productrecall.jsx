import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import TextField from '@material-ui/core/TextField';

import './product.css';


const columns = [
    { field: 'id', headerName: 'S.NO.', width: 250, sortable: false },
    { field: 'storeid', headerName: 'STORE ID', width: 250 },
    { field: 'productid', headerName: 'PRODUCTID', width: 220 },
    { field: 'mfgcode', headerName: 'MANUFACTURE PRODUCT CODE', width: 220 }
];

const rows = [];


export default class ProductRecallPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            productid: '',
            filterdata: []
        }
        this.renderTableData = this.renderTableData.bind(this)
        this.fetchfilteredproducts = this.fetchfilteredproducts.bind(this)
    }

    productChangeHandler = (e) => {
        this.setState({ productid: e.target.value })
    }

    storeDetails() {
        window.localStorage.clear();
        window.location.href = '/login/store';
    }

    /* componentDidMount(){
        this.fetchfilteredproducts();
 }*/



    fetchfilteredproducts() {
        var apiBaseUrl = "http://localhost:8080/";
        axios.get(apiBaseUrl + 'fetchissueproduct', {
            params:
            {
                "productid": this.state.productid
            }
        }
        )
            .then(response => {
                console.log("Response status (VIEW button) : " + response.status);
                console.log("Response data : " + response.data);
                console.log("Response length" + response.data.length)
                if (response.status == 200 && (typeof response.data !== undefined) && response.data !== null) {
                    console.log("Response ARRAY : " + response.data[0].storeid);
                    let rows = [];
                    this.setState({ filterdata: response.data })
                    for (var i = 0; i < this.state.filterdata; i++) {
                        rows.push({
                            id: i + 1,
                            storeid: this.state.filterdata[i].storeid,
                            productid: this.state.filterdata[i].productid,
                            mfgcode: this.state.filterdata[i].mfgcode
                        })
                    }
                    //console.log(rows.length)
                    console.log("filtered data is " + this.state.filterdata);

                    return rows;


                    //this.props.history.push({ pathname: '/login/productrecall', state: { data: this.state.issueproductdetails } })
                } else {
                    alert("No data found");
                }
            }

            )


    }

    renderTableData() {

        for (var i = 0; i < this.props.location.state.data.length; i++) {
            rows.push({
                id: i + 1,
                storeid: this.props.location.state.data[i].storeid,
                productid: this.props.location.state.data[i].productid,
                mfgcode: this.props.location.state.data[i].mfgcode
            })
        }
        return rows;
    }


    logout() {
        window.localStorage.clear();
        window.location.href = '/login';
    }

    render() {


        if (typeof this.props.location.state.data[0].storeid !== 'undefined' && typeof this.props.location.state.data[0].productid !== 'undefined'
            && this.props.location.state.data[0].mfgcode !== 'undefined') {
            this.renderTableData();
        }
        return (
            <div className="body" >
                <div>
                    <h3 className="h1-title">Issued Product Details</h3>
                </div>
                <div>
                    <span><label>Product ID </label><input type="text" ref="productid" value={this.state.productid} onChange={this.productChangeHandler} ></input></span>
                    <span> </span>
                    <Button onClick={this.fetchfilteredproducts} variant="contained" color="danger"  >Search</Button>
                </div>
                <br/><br/>
                <div style={{ height: 320, width: '75%' }} className="center">
                    <DataGrid rows={rows} columns={columns} pageSize={5} />
                </div>

                <br />
                <Button onClick={this.storeDetails} variant="contained" color="danger" style={{ margin: "auto", backgroundColor: "green" }}>Go to Store Details</Button>
                <Button onClick={this.logout} variant="contained" color="danger" style={{ margin: "auto", backgroundColor: "blue", }}>Logout</Button>
            </div>
        );
    }
}
