import React from 'react';
import { MuiThemeProvider } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import '../App.css';
import axios from 'axios';



export default class StoreDetailsPage extends React.Component {



  constructor(props) {
    super(props)
    this.state = {
      storeid: '',
      productid: '',
      tableheader: ['', 'StoreID', 'ProductID', 'ProductName', 'Quantity Available On Hand'],
      checked: -1,
      products: [],
      selectedstoreid: '',
      selectedproductid: '',
      selectedproductname: '',
      productdetails: []

    }
    this.renderTableData = this.renderTableData.bind(this)
    this.fetchStoreDetails = this.fetchStoreDetails.bind(this);

  }

  storeChangeHandler = (e) => {
    this.setState({ storeid: e.target.value })
  }

  productChangeHandler = (e) => {
    this.setState({ productid: e.target.value })
  }

  fetchStoreDetails() {
    var apiBaseUrl = "https://prodrecallrest.azurewebsites.net/";

    axios.get(apiBaseUrl + 'fetchproduct', {
      params:
      {
        "storeid": this.state.storeid,
        "productid": this.state.productid
      }
    })
      .then(response => {
        this.infos = response.data;
        var myObject = this.infos;
        this.setState({ products: response.data })
        console.log("reponse is", this.state.products)

      })


  }



  onChange(i) {
    this.setState({
      checked: i
    });
    console.log('value of i' + i);

  }

  onChangeradio(product, i) {
    this.setState({
      checked: i,
      selectedstoreid: product.storeid,
      selectedproductid: product.productid

    });
    console.log('value of i' + i);
    console.log('Value of product' + product.storeid)
  }

  renderTableHeader() {
    let list = [];
    for (var i = 0; i < this.state.tableheader.length; i++) {
      console.log('-----i---' + i);
      console.log('--------' + this.state.tableheader[i]);
      list.push(<th id={this.state.tableheader[i]}>{this.state.tableheader[i]}</th>);
    }
    return list;
  }
  renderTableData() {
    if (this.state.checked > -1) {
      var apiBaseUrl = "https://prodrecallrest.azurewebsites.net/";
      axios.get(apiBaseUrl + 'viewproduct', {
        params:
        {
          "storeid": this.state.selectedstoreid,
          "productid": this.state.selectedproductid
        }
      })
        .then(response => {
          console.log("Response status (VIEW button) : " + response.status);
          console.log("Response data : " + response.data);
          if (response.status == 200 && (typeof response.data !== undefined) && response.data !== null) {
            console.log("Response ARRAY : " + response.data);
            console.log("Got the response : " + this.state.productdetails);
            this.setState({ productdetails: response.data })
            this.props.history.push({ pathname: '/login/product', state: { data: this.state.productdetails } })

          } else {
            alert("No data found");
          }
        }

        )


    }
    else {
      alert("Please select the product to be returned")
    }

  }

  render() {
    return (
      <MuiThemeProvider>
        <div id="bgimage">


          <div id='storeDetails'>

            <h3 align="center">PRODUCT IN STOCK DETAILS </h3>
            <h5>CATEGORY: NOODLES</h5>

            <span><label>Store ID </label><input type="text" ref="storeid" value={this.state.storeid}
              onChange={this.storeChangeHandler}></input></span>
            <span><label>Product ID </label><input type="text" ref="productid" value={this.state.productid}
              onChange={this.productChangeHandler}></input></span>
            <br /><br /><br />
            <Button onClick={this.fetchStoreDetails} variant="contained" color="danger" style={{ display: "flex", margin: "auto", backgroundColor: "#d1e0e0" }}>Fetch Product Details</Button>

            <br /><br />


            <table id='storeDetails'>
              <thead>
                <tr>{this.renderTableHeader()}</tr>
              </thead>
              <tbody>

                {(this.state.products.length > 0) ? this.state.products.map((product, index) => {
                  return (
                    <tr key={index}>
                      <td><input type="radio" value={product}
                        checked={this.state.checked == index ? true : false}
                        onChange={this.onChangeradio.bind(this, product, index)} ></input></td>
                      <td>{product.storeid}</td>
                      <td>{product.productid}</td>
                      <td>{product.productname}</td>
                      <td>{product.quantity}</td>

                    </tr>
                  )
                }) : <tr><td colSpan="5">PRODUCT DETAILS...</td></tr>}
              </tbody>
            </table>
            <br />

            <Button onClick={this.renderTableData} variant="contained" color="default" align="center" style={{ display: "flex", margin: "auto", backgroundColor: "#d1e0e0" }}>View Product Details</Button>
            <br />
            <div></div>
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}
