import React, { Component } from 'react';
import './ItemInput.css';

class ItemInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            itemName: this.props.itemName,
            itemPercentage: this.props.itemPercent,
        };
        this.updateName = this.updateName.bind(this);
        this.updatePercentage = this.updatePercentage.bind(this);

    }

    updateName(evt) {
        this.setState({itemName: evt.target.value});
        this.props.itemChangeHandler(this.props.itemId, this.state.itemName, this.state.itemPercentage);
    }
    updatePercentage(evt) {
        this.setState({itemPercentage: evt.target.value});
        this.props.itemChangeHandler(this.props.itemId, this.state.itemName, this.state.itemPercentage);

    }

    render() {
        return(
            <div>
                <input type="text" id="itemTitle" placeholder={this.state.itemName} value={this.state.itemName} onChange={this.updateName} />
                <input type="number" id="itemPercentage" placeholder={this.state.itemPercentage} value={this.state.itemPercentage} onChange={this.updatePercentage} />
                <span  id="itemTotal">Default value</span>

            </div>
        );
    }

}
export default ItemInput;