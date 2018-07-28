import React, { Component } from "react";
import BudgetInput from "./components/BudgetInput/BudgetInput";
import ItemCardContainer from "./components/ItemCardContainer/ItemCardContainer";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import "./App.css";

var currentBudgetCollection;
var offlineData = window.localStorage;
var remainderCalculation;
var remainderMessage;
var remainderPercentage;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    if (
      offlineData.getItem("budgetItemCollection") != null &&
      offlineData.getItem("dbudget") != null
    ) {
      this.state = {
        total: JSON.parse(offlineData.getItem("dbudget")),
        budgetItemCollection: JSON.parse(
          offlineData.getItem("budgetItemCollection")
        )
      };
    } else {
      this.state = {
        total: 100,
        budgetItemCollection: [
          {
            name: "Example Category",
            id: 1602100152,
            percent: 10,
            total: "12.30"
          }
        ]
      };
    }

    this.calculateAmounts = this.calculateAmounts.bind(this);
    this.setBudgetTotal = this.setBudgetTotal.bind(this);
    this.itemChangeHandler = this.itemChangeHandler.bind(this);
    this.selectItem = this.selectItem.bind(this);
    this.addNewItem = this.addNewItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.syncToLocalStorage = this.syncToLocalStorage.bind(this);

    currentBudgetCollection = this.state.budgetItemCollection;
    this.syncToLocalStorage();
  }

  syncToLocalStorage() {
    offlineData.setItem(
      "budgetItemCollection",
      JSON.stringify(this.state.budgetItemCollection)
    );
    offlineData.setItem("dbudget", JSON.stringify(this.state.total));
  }

  calculateAmounts() {
    let budgetTotal = this.state.total;
    let calculation = 0;
    let currentlyUsed = 0;
    remainderCalculation = 0;
    Object.keys(currentBudgetCollection).forEach(function(key) {
      if (currentBudgetCollection[key] != null) {
        calculation = (
          budgetTotal *
          (currentBudgetCollection[key]["percent"] / 100)
        ).toFixed(2);
        currentBudgetCollection[key]["total"] = calculation;
        currentlyUsed = currentlyUsed + parseFloat(calculation);
      }
    });
    remainderCalculation = budgetTotal - currentlyUsed;
    if (remainderCalculation > 0) {
      remainderCalculation = remainderCalculation.toFixed(2);
      remainderMessage = "remaining";
      remainderPercentage = Math.round(
        (remainderCalculation / budgetTotal) * 100
      );
      remainderCalculation = "$" + remainderCalculation;

      remainderPercentage = "(" + remainderPercentage + "%)";
    } else if (remainderCalculation < 0) {
      remainderPercentage = Math.round(
        (remainderCalculation / budgetTotal) * 100
      );
      remainderPercentage = "(" + remainderPercentage + "%)";

      remainderCalculation = "-$" + remainderCalculation.toFixed(2) * -1;
      remainderMessage = "overused";
    } else if (remainderCalculation === 0) {
      remainderPercentage = Math.round(
        (remainderCalculation / budgetTotal) * 100
      );
      remainderPercentage = "";
      remainderCalculation = "$" + remainderCalculation;
      remainderMessage = "remaining";
    }

    this.setState({ budgetItemCollection: currentBudgetCollection });
    this.syncToLocalStorage();
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
    this.syncToLocalStorage();
  }

  removeItem(itemId) {
    delete currentBudgetCollection[this.selectItem(itemId)];
    this.setState({ budgetItemCollection: currentBudgetCollection });
    this.syncToLocalStorage();
  }

  setBudgetTotal(amount) {
    this.setState({ total: amount });
    this.syncToLocalStorage();
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
    this.syncToLocalStorage();
  }

  componentDidMount() {
    this.calculateAmounts();
  }

  render() {
    return (
      <ErrorBoundary>
        <div className="ColoredBackgroundHeader" />
        <BudgetInput
          budgetConfirmHandler={this.setBudgetTotal}
          currentTotal={this.state.total}
          calculate={this.calculateAmounts}
        />
        <ItemCardContainer
          budgetItemCollection={this.state.budgetItemCollection}
          calculate={this.calculateAmounts}
          itemChangeHandler={this.itemChangeHandler}
          deleteItemHandler={this.removeItem}
        />
        <div className="LowerContainer">
          <div className="CalculationContainer">
            <div className={"RemainderCalculation--" + remainderMessage}>
              {remainderCalculation}
            </div>
            <div className="RemainderMessage">
              {remainderPercentage} {remainderMessage}
            </div>

            <button className="CreateNewButton" onClick={this.addNewItem}>
              +
            </button>
          </div>
        </div>
        <a
          href="https://github.com/jacksonhvisuals/simplicity"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-github" />
        </a>
      </ErrorBoundary>
    );
  }
}
