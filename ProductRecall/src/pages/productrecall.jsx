import * as React from 'react';
import Button from '@material-ui/core/Button';
import './product.css';


export default class ProductRecallPage extends React.Component {

    constructor(props) {
        super(props);
    }

    renderBatch() {
        var batchid = "";
        for (let i = 0; i < this.props.location.state.data.length; i++) {
            batchid = batchid + this.props.location.state.data[i];
            if (i < (this.props.location.state.data.length - 1)) {
                batchid = batchid + ', '
            }
        }
        return batchid;
    }

    render() {

        if (typeof this.props.location.state.data[0] !== 'undefined') {
            localStorage.setItem("batchID", this.renderBatch());
        }

        return (
            <div className="product-header">
                <div >
                    <h3>The selected products of the batch {localStorage.getItem("batchID")} has been recalled successfully.</h3>
                </div>
                <br />
                <br /><br />
                <br />

                <div id="outer">
                    <span>
                        <div className="inner">
                            <Button onClick={() => this.props.history.push("/login/store")} variant="contained" color="danger" style={{ display: "flex", margin: "auto", backgroundColor: "#b3ffb3" }}>Go to Store Details</Button>
                        </div>
                    </span>


                    <span>
                        <div className="inner">

                            <Button onClick={() => this.props.history.push("/login")} variant="contained" color="danger" style={{ display: "flex", margin: "auto", backgroundColor: "#ffff80", align: "right" }}>Logout</Button>
                        </div>
                    </span></div>
            </div>
        );

    }
}

