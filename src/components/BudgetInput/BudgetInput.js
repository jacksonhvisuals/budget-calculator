import React, { Component } from "react";
import "./BudgetInput.css";

class BudgetInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: this.props.currentTotal
    };
    this.updateInputValue = this.updateInputValue.bind(this);
    this.updateStateValue = this.updateStateValue.bind(this);
    this.returnFunction = this.returnFunction.bind(this);
  }

  updateInputValue(evt) {
    this.setState({ inputValue: evt.target.value });
    this.props.budgetConfirmHandler(this.state.inputValue);
    this.props.calculate();
    let targetvalue = parseFloat(evt.target.value, 10);
    let newWidth = targetvalue.toString().length + "ch";
    let inputwidth = document.getElementById("budgetInputForm");
    inputwidth.style.width = newWidth;
  }

  updateStateValue(evt) {
    this.setState({ inputValue: evt.target.value });
    this.props.budgetConfirmHandler(this.state.inputValue);
    this.props.calculate();
    console.log(this.state.inputValue);
  }
  returnFunction(event) {
    if (event.keyCode === 13) {
      this.setState({
        inputValue: document.getElementById("budgetInputForm").value
      });
      this.props.budgetConfirmHandler(this.state.inputValue);
      this.props.calculate();
    }
  }
  componentDidMount() {
    let inputwidth = document.getElementById("budgetInputForm");
    let startingWidth = inputwidth.value.length + "ch";
    inputwidth.style.width = startingWidth;
    document.addEventListener("keydown", this.returnFunction, false);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.returnFunction, false);
  }

  render() {
    return (
      <div>
        <div className="headerContainer">
          <div className="text-center">
            <div id="input-icon">$</div>
            <input
              type="number"
              step="0.01"
              id="budgetInputForm"
              placeholder="Total amount..."
              value={this.state.inputValue}
              onChange={this.updateInputValue}
              onBlur={this.updateStateValue}
            />
          </div>
          <div id="inputsubtext">TOTAL AMOUNT</div>
        </div>
      </div>
    );
  }
}

export default BudgetInput;
