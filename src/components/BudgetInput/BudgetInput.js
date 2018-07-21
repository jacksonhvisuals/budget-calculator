import React, { Component } from 'react';
import './BudgetInput.css';

class BudgetInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: this.props.currentTotal,
        };
        this.updateInputValue = this.updateInputValue.bind(this);
        this.updateStateValue = this.updateStateValue.bind(this);
    }

    updateInputValue(evt) {
        this.setState({inputValue: evt.target.value});
        // this.props.budgetConfirmHandler(this.state.inputValue);
        console.log(this.state.inputValue);
        let targetvalue = parseInt(evt.target.value, 10);
        let newWidth = targetvalue.toString().length + "ch";
        let inputwidth = document.getElementById("budgetInputForm");
        inputwidth.style.width = newWidth;
        console.log("NewWidth: " + newWidth);
    }

    updateStateValue(evt) {
        this.setState({inputValue: evt.target.value});
        this.props.budgetConfirmHandler(this.state.inputValue);
    }
    
    componentDidMount() {
        let inputwidth = document.getElementById("budgetInputForm");
        let startingWidth = inputwidth.value.length + "ch";
        console.log("Starting width: " + startingWidth);
        inputwidth.style.width = startingWidth;
    }

    render() {
        return(
            <div>
                <div className="headerContainer">
                    <div class="text-center">
                        <div id="input-icon">$</div>
                        <input 
                            type="number" 
                            id="budgetInputForm" 
                            placeholder="Total amount..." 
                            value={this.state.inputValue} 
                            onChange={this.updateInputValue} 
                            onBlur={this.updateStateValue} />
                </div>
                <div id="inputsubtext">TOTAL AMOUNT</div>

                </div>
                </div>
        );
    }

}

export default BudgetInput;