import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";
import {MuiThemeProvider} from "@material-ui/core/styles";
import axios from 'axios';
import  '../App.css';
import './product.css';




const columns = [
    { field: 'id', headerName: 'Manufacturing Product Code', width: 250, sortable: false },
    { field: 'mfdate', headerName: 'Manufacturing Date', width: 200 }
];

const rows = [
    { id: '124567', mfdate: '2020-10-14' },
    { id: '178637', mfdate: '2018-05-14' },
];

export default class ProductDetailsPage1 extends React.Component {

    constructor(props) {
        super(props) 
        this.state = { 
            
            productname:'HideandSeek',
            
           tableheader: ['','MANUGACTURED PRODUCT CODE','MANUFACTURED PRODUCT DATE'],
          
        }
        this.doProductRecall=this.doProductRecall.bind(this);
        this.renderTableData = this.renderTableData.bind(this);

        //var myObject = [] ; 
      }
  

    doProductRecall() {
    window.localStorage.clear();
    window.location.href = '/login/productrecall';

}


renderTableHeader() {
    let list=[];
    for(var i=0; i < this.state.tableheader.length;i++){
     console.log('-----i---'+i);
       console.log('--------'+this.state.tableheader[i]);
       list.push(<th id={this.state.tableheader[i]}>{this.state.tableheader[i]}</th>);
    }     
    return list;
   }

onChangeFn=(e)=> {
    console.log("entered here", e)
    var list1=e.rowIds;
    console.log("list1 here", list1)
    

}

renderTableData() {
    //const history = {​​​​​ useHistory }​​​​​;
    var apiBaseUrl = "http://localhost:8080/";
    axios.get(apiBaseUrl+'productRecall', {
      params:
      {
        "storeid" : this.state.selectedstoreid,
        "productid": this.state.selectedproductid
      }
    })
    .then(response => {
      console.log("Response status (VIEW button) : "+response.status);
      console.log("Response data : "+response.data);
      if (response.status == 200 && (typeof  response.data !== undefined) && response.data !== null) {
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

componentDidMount(){
    console.log("this.props are",this.props)
}
    render() {
        if (typeof  this.props.location.state.data[0].storeid !== 'undefined' && typeof this.props.location.state.data[0].productid !== 'undefined' ) {
            localStorage.setItem("storeID", this.props.location.state.data[0].storeid);
            localStorage.setItem("productID", this.props.location.state.data[0].productid);
        }

        return (
            <MuiThemeProvider>
            <div>
                   <h3 align="center"> STORE DETAILS </h3>
               </div>
           <div id='storedetails'>
               
           <div> 
              <span><label>Store ID </label><label>{localStorage.getItem("productID")}</label></span>
              <span><label>Product ID </label><label>{localStorage.getItem("storeID")}</label></span>
              <span><label>Product Name </label><label>{this.state.productname}</label></span>
           </div><br/>
           </div>
          <div>
          <table id='storeDetails'>
             <thead>
           <tr>{this.renderTableHeader()}</tr>
            </thead>
                <tbody>
                   
                   { (this.state.products.length > 0) ? this.state.products.map( (product, index) => {
                      return (
                          <tr key={ index }>
                          <td><input type="checkbox" value={product}
                                     checked={this.state.checked == index? true: false}
                                     onChange={this.onChangeFn.bind(this,product,index)} ></input></td>
                          <td>{ product.storeid }</td>
                          <td>{ product.productid }</td>
                          <td>{ product.productname}</td>
                          <td>{ product.quantity }</td>
             
           </tr>
         )
        }) : <tr><td colSpan="5">PRODUCT DETAILS...</td></tr> }
                </tbody>
             </table>
          </div> <br/>
          <div id='storeDetails'>
          <Button onClick={this.renderTableData} variant="contained" color="default" align="center">PROD RECALL</Button>
          </div>
          </MuiThemeProvider>
        );
    }
}
