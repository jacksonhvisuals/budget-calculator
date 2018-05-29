import React, { Component } from 'react';
import './BudgetInput.css';
class BudgetInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: '',
        };
        this.updateInputValue = this.updateInputValue.bind(this);
    }

    updateInputValue(evt) {
        this.setState({inputValue: evt.target.value});
        this.props.budgetConfirmHandler(this.state.inputValue);
    }

    render() {
        return(
            <div>
                <input type="number" id="budgetInputForm" placeholder="Total amount..." value={this.state.inputValue} onChange={this.updateInputValue} />
            </div>
        );
    }

}
export default BudgetInput;