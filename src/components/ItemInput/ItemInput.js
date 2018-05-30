import React, { Component } from 'react';
import './ItemInput.css';

class ItemInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemName: this.props.itemName,
            itemPercentage: this.props.itemPercent,
        };
        this.updateName = this.updateName.bind(this);
        this.updatePercentage = this.updatePercentage.bind(this);
        this.updatePercentageBlur = this.updatePercentageBlur.bind(this);

    }

    updateName(evt) {
        this.setState({itemName: evt.target.value});
        this.props.itemChangeHandler(this.props.itemId, this.state.itemName, this.state.itemPercentage);
    }
    updatePercentageBlur(evt) {
        this.setState({itemPercentage: parseInt(evt.target.value, 10)});
        this.props.itemChangeHandler(this.props.itemId, this.state.itemName, this.state.itemPercentage);
        console.log(parseInt(evt.target.value, 10));
    }
    updatePercentage(evt) {
        this.setState({itemPercentage: parseInt(evt.target.value, 10)});
    }

    render() {
        return(
            <div>
                <input type="text" id="itemTitle" placeholder={this.state.itemName} value={this.state.itemName} onChange={this.updateName} />
                <input type="number" id="itemPercentage" placeholder={this.state.itemPercentage} value={this.state.itemPercentage} onChange={this.updatePercentage} onBlur={this.updatePercentageBlur} />
                <span  id="itemTotal">${this.props.itemTotal}</span>
            </div>
        );
    }

}
export default ItemInput;