import React, { Component } from "react";
import BudgetInput from "../BudgetInput/BudgetInput";
import ItemCardContainer from "../ItemCardContainer/ItemCardContainer";
import "./AppLayout.css";
var currentBudgetCollection;
var offlineData = window.localStorage;
var remainderCalculation;
var remainderMessage;
var remainderPercentage;

class AppLayout extends Component {
  constructor(props) {
    super(props);

    if (offlineData.getItem("budgetItemCollection") != null) {
      this.state = {
        total: JSON.parse(offlineData.getItem("budget")),
        budgetItemCollection: JSON.parse(
          offlineData.getItem("budgetItemCollection")
        )
      };
    } else {
      this.state = {
        total: 0,
        budgetItemCollection: []
      };
    }

    this.calculateAmounts = this.calculateAmounts.bind(this);
    this.setBudgetTotal = this.setBudgetTotal.bind(this);
    this.itemChangeHandler = this.itemChangeHandler.bind(this);
    this.selectItem = this.selectItem.bind(this);
    this.addNewItem = this.addNewItem.bind(this);
    this.copyTotal = this.copyTotal.bind(this);
    currentBudgetCollection = this.state.budgetItemCollection;
    this.calculateAmounts();
    console.log(JSON.parse(offlineData.getItem("budgetItemCollection")));
  }

  calculateAmounts() {
    let budgetTotal = this.state.total;
    let calculation;
    let currentlyUsed = 0;
    remainderCalculation = 0;
    Object.keys(currentBudgetCollection).forEach(function(key) {
      calculation = (
        budgetTotal *
        (currentBudgetCollection[key]["percent"] / 100)
      ).toFixed(2);
      currentBudgetCollection[key]["total"] = calculation;
      currentlyUsed = currentlyUsed + parseFloat(calculation);
    });
    remainderCalculation = budgetTotal - currentlyUsed;
    if (remainderCalculation > 0) {
      remainderCalculation = remainderCalculation.toFixed(2);
      remainderMessage = " REMAINING";
    } else if (remainderCalculation < 0) {
      remainderCalculation = remainderCalculation.toFixed(2) * -1;
      remainderMessage = " OVERUSED";
    }
    remainderPercentage = Math.round(
      (remainderCalculation / budgetTotal) * 100
    );

    this.setState({ budgetItemCollection: currentBudgetCollection });
    offlineData.setItem(
      "budgetItemCollection",
      JSON.stringify(this.state.budgetItemCollection)
    );
  }

  selectItem(itemid) {
    var element = null;
    Object.keys(currentBudgetCollection).forEach(function(key) {
      if (currentBudgetCollection[key].id === itemid) {
        element = key;
        return;
      }
    });
    return element;
  }

  itemChangeHandler(itemId, itemName, itemPercent) {
    console.log(
      "Bundle received. ID: " +
        itemId +
        ", name: " +
        itemName +
        ", percent: " +
        itemPercent
    );
    currentBudgetCollection[this.selectItem(itemId)]["name"] = itemName;
    currentBudgetCollection[this.selectItem(itemId)]["percent"] = itemPercent;
    this.setState({ budgetItemCollection: currentBudgetCollection });
    offlineData.setItem(
      "budgetItemCollection",
      JSON.stringify(this.state.budgetItemCollection)
    );
  }

  setBudgetTotal(amount) {
    this.setState({ total: amount });
    offlineData.setItem("budget", JSON.stringify(amount));

    this.calculateAmounts();
  }

  addNewItem() {
    let newid = Math.floor(Math.random() * (1876251987 - 51987) + 51987);
    let newItem = {
      name: "Item Title Here",
      id: newid,
      percent: 10,
      total: ""
    };
    currentBudgetCollection.push(newItem);
    this.setState({ budgetItemCollection: currentBudgetCollection });
    offlineData.setItem(
      "budgetItemCollection",
      JSON.stringify(this.state.budgetItemCollection)
    );
  }

  // Automatically copy total to clipboard.
  copyTotal(item) {}

  render() {
    return (
      <div>
        <div id="background-color-header" />
        <BudgetInput
          budgetConfirmHandler={this.setBudgetTotal}
          currentTotal={this.state.total}
          calculate={this.calculateAmounts}
        />
        <ItemCardContainer
          budgetItemCollection={this.state.budgetItemCollection}
          copyTotal={this.copyTotal}
          calculate={this.calculateAmounts}
          itemChangeHandler={this.itemChangeHandler}
        />
        <div id="">
          <div id="remainderCalculation">
            ${remainderCalculation} ({remainderPercentage}%)
          </div>
          <div id="remainderMessage">{remainderMessage}</div>
          <button id="createNewButton" onClick={this.addNewItem}>
            +
          </button>
        </div>
      </div>
    );
  }
}

export default AppLayout;
