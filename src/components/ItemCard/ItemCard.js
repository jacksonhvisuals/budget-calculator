import React, { Component } from 'react';
import ClipboardJS from 'clipboard';
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
        new ClipboardJS(".clipbtn");

    }

    updateName(evt) {
        this.setState({itemName: evt.target.value});
        this.props.itemChangeHandler(this.props.itemId, this.state.itemName, this.state.itemPercentage);
        let newWidth = evt.target.value.length + "ch";
        let inputwidth = document.getElementById("title-" + this.props.itemId);
        inputwidth.style.width = newWidth;
        console.log("NewWidth: " + newWidth);
    }
    
    updatePercentageBlur(evt) {
        this.setState({itemPercentage: parseInt(evt.target.value, 10)});
        this.props.itemChangeHandler(this.props.itemId, this.state.itemName, this.state.itemPercentage);
        this.props.calculate();
    }

    updatePercentage(evt) {
        this.setState({itemPercentage: parseInt(evt.target.value, 10)});
        let targetvalue = parseInt(evt.target.value, 10);
        let newWidth = targetvalue.toString().length + "ch";
        let inputwidth = document.getElementById("input-" + this.props.itemId);
        inputwidth.style.width = newWidth;
        this.props.itemChangeHandler(this.props.itemId, this.state.itemName, this.state.itemPercentage);
        this.props.calculate();
    }

    componentDidMount() {
        let percentwidth = document.getElementById("input-" + this.props.itemId);
        let startingWidth = percentwidth.value.length + "ch";
        percentwidth.style.width = startingWidth;

        let titlewidth = document.getElementById("title-" + this.props.itemId);
        let titlestartingWidth = titlewidth.value.length + "ch";
        titlewidth.style.width = titlestartingWidth;
    }

    render() {
        return(
            <div>
                <div className="item-card" id={this.props.itemId}>
                    <div className="left-half">
                        <input type="text" className="itemTitle" id={"title-" + this.props.itemId} placeholder={this.state.itemName} value={this.state.itemName} onChange={this.updateName} />
                        <div className="itemPercentage">
                            <input 
                            id={"input-" + this.props.itemId} 
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
                        <span id={"itemTotal" + this.props.itemId} className="itemTotal clipbtn" onClick={this.props.itemClickHandler(this.props.itemId)} data-clipboard-action="copy" data-clipboard-target={"#itemTotal" + this.props.itemId}>${this.props.itemTotal}</span>
                    </div>  
                </div>
            </div>
        );
    }

}
export default ItemCard;