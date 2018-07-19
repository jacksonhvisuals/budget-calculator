import React, { Component } from 'react';
import BudgetInput from '../BudgetInput/BudgetInput';
import ItemCardContainer from '../ItemCardContainer/ItemCardContainer';
import './AppLayout.css';
var currentBudgetCollection;

class AppLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            total: 1420,
            budgetItemCollection: [
            {
              name: "Savings",
              id: Math.floor(Math.random() * (1876251987 - 51987) + 51987),
              percent: 20,
              total: "",  
            },
            {
                name: "Food",
                id: Math.floor(Math.random() * (1876251987 - 51987) + 51987),
                percent: 14,
                total: "",  
              },
        
            ],
        };

        this.calculateAmounts = this.calculateAmounts.bind(this);
        this.setBudgetTotal = this.setBudgetTotal.bind(this);
        this.itemChangeHandler = this.itemChangeHandler.bind(this);
        this.selectItem = this.selectItem.bind(this);
        this.addNewItem = this.addNewItem.bind(this);
        this.copyTotal = this.copyTotal.bind(this);
        currentBudgetCollection = this.state.budgetItemCollection;

        this.calculateAmounts();

    }

    calculateAmounts() {
        let budgetTotal = this.state.total;
        let calculation;
        Object.keys(currentBudgetCollection).forEach(function(key){
            calculation = (budgetTotal * (currentBudgetCollection[key]["percent"] / 100)).toFixed(2);
            currentBudgetCollection[key]["total"] = calculation;
        });
        this.setState({budgetItemCollection: currentBudgetCollection});
        console.log(currentBudgetCollection);
    }

    selectItem(itemid) {
        var element = null;
        Object.keys(currentBudgetCollection).forEach(function(key) {
            if(currentBudgetCollection[key].id === itemid){
                element = key;
                return;
            }
        });
        return element;
      }

    itemChangeHandler(itemId, itemName, itemPercent) {
        console.log("Bundle received. ID: " + itemId + ", name: " + itemName + ", percent: " + itemPercent);
        currentBudgetCollection[this.selectItem(itemId)]["name"] = itemName;
        currentBudgetCollection[this.selectItem(itemId)]["percent"] = itemPercent;
        this.setState({budgetItemCollection: currentBudgetCollection});
    }

    setBudgetTotal(amount) {
        this.setState({
            total: amount
        });
        this.calculateAmounts();
    }

    addNewItem() {
        let newid = Math.floor(Math.random() * (1876251987 - 51987) + 51987);
        let newItem = {
            name: "Item Title Here",
            id: newid,
            percent: 10,
            total: "",  
          };
          currentBudgetCollection.push(newItem);
          this.setState({budgetItemCollection: currentBudgetCollection});     
    }

    // Automatically copy total to clipboard.
    copyTotal(item) {
    }

    render() {
        return(
            <div>
                <div id="background-color-header"></div>
                <BudgetInput budgetConfirmHandler={this.setBudgetTotal} currentTotal={this.state.total}/>
                <ItemCardContainer budgetItemCollection={this.state.budgetItemCollection} copyTotal={this.copyTotal} calculate={this.calculateAmounts} itemChangeHandler={this.itemChangeHandler}/>
                <button id="createNewButton" onClick={this.addNewItem}>+</button>
            </div>
        );
    }

}

export default AppLayout;