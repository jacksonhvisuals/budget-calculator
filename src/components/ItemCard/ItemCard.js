import React, { Component } from 'react';
import './ItemCard.css';

class ItemCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemName: this.props.itemName,
            itemPercentage: this.props.itemPercent,
        };
        this.updateName = this.updateName.bind(this);
        this.updatePercentage = this.updatePercentage.bind(this);
        this.updatePercentageBlur = this.updatePercentageBlur.bind(this);
        this.resizeInput = this.resizeInput.bind(this);

    }

    updateName(evt) {
        this.setState({itemName: evt.target.value});
        this.props.itemChangeHandler(this.props.itemId, this.state.itemName, this.state.itemPercentage);
    }
    
    updatePercentageBlur(evt) {
        this.setState({itemPercentage: parseInt(evt.target.value, 10)});
        this.props.itemChangeHandler(this.props.itemId, this.state.itemName, this.state.itemPercentage);
        this.props.calculate();
        console.log(parseInt(evt.target.value, 10));
    }

    updatePercentage(evt) {
        this.setState({itemPercentage: parseInt(evt.target.value, 10)});
        this.resizeInput();
    }

    resizeInput() {
        var inputfella = document.getElementById("percentageInput");
        inputfella.width = this.state.itemPercentage.length + "ch";
        console.log("Updated width of " + inputfella + " to " + this.state.itemPercentage.length);
    }

    render() {
        return(
            <div>
                <div className="item-card">
                    <div className="left-half">
                        <input type="text" className="itemTitle" placeholder={this.state.itemName} value={this.state.itemName} onChange={this.updateName} />
                        <div className="itemPercentage">
                            <input 
                            id="percentageInput" 
                            type="number" 
                            className="itemPercentage" 
                            placeholder={this.state.itemPercentage} 
                            value={this.state.itemPercentage} 
                            onChange={this.updatePercentage} 
                            onBlur={this.updatePercentageBlur} />
                            %
                        </div>
                    </div>
                    <div className="right-half">
                        <span id={"itemTotal" + this.props.itemId} className="itemTotal" onClick={this.props.itemClickHandler(this.props.itemId)}>${this.props.itemTotal}</span>
                    </div>  
                </div>
            </div>
        );
    }

}
export default ItemCard;