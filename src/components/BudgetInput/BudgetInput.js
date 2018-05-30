import React, { Component } from 'react';
import './BudgetInput.css';

class BudgetInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: '',
        };
        this.updateInputValue = this.updateInputValue.bind(this);
        this.updateStateValue = this.updateStateValue.bind(this);
    }

    updateInputValue(evt) {
        this.setState({inputValue: evt.target.value});
        // this.props.budgetConfirmHandler(this.state.inputValue);
        console.log(this.state.inputValue);
    }

    updateStateValue(evt) {
        this.setState({inputValue: evt.target.value});

        this.props.budgetConfirmHandler(this.state.inputValue);
    }

    render() {
        return(
            <div>
                <input type="number" id="budgetInputForm" placeholder="Total amount..." value={this.state.inputValue} onChange={this.updateInputValue} onBlur={this.updateStateValue} />
            </div>
        );
    }

}
export default BudgetInput;