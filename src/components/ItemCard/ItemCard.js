import React, { Component } from 'react';
import './ItemCard.css';

var specialStyles;
class ItemCard extends Component {

    
    constructor(props) {
        super(props);
        this.state = {
            itemName: this.props.itemName,
            itemPercentage: this.props.itemPercent,
            inputwidth: "2ch",
        };
        this.updateName = this.updateName.bind(this);
        this.updatePercentage = this.updatePercentage.bind(this);
        this.updatePercentageBlur = this.updatePercentageBlur.bind(this);
        specialStyles = {
            width: this.state.inputwidth
        };
    }

    updateName(evt) {
        this.setState({itemName: evt.target.value});
 
        this.props.itemChangeHandler(this.props.itemId, this.state.itemName, this.state.itemPercentage);
    }
    
    updatePercentageBlur(evt) {
        this.setState({itemPercentage: parseInt(evt.target.value, 10)});
        this.props.itemChangeHandler(this.props.itemId, this.state.itemName, this.state.itemPercentage);
        this.props.calculate();
        let targetvalue = parseInt(evt.target.value, 10);
        let newWidth = targetvalue.toString().length + "ch";
        this.setState({inputwidth: newWidth});
        specialStyles = {width: newWidth};

    }

    updatePercentage(evt) {
        this.setState({itemPercentage: parseInt(evt.target.value, 10)});
    }

    componentDidMount() {
        var inputwidth = document.getElementById("percentageInput");
        this.setState({inputwidth: inputwidth.width});
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
                            onBlur={this.updatePercentageBlur} 
                            style={specialStyles} />
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