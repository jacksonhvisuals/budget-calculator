import React, { Component } from 'react';
import BudgetInput from '../BudgetInput/BudgetInput';
import ItemInput from '../ItemInput/ItemInput';
import BudgetItemContainer from '../BudgetItemContainer/BudgetItemContainer';
var currentBudgetCollection;

class AppLayout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            total: 0,
            budgetItemCollection: [{
              name: "Savings",
              id: 1,
              percent: 20,
              total: "",  
            }],
        };

        this.calculateAmount = this.calculateAmount.bind(this);
        this.setBudgetTotal = this.setBudgetTotal.bind(this);
        this.itemChangeHandler = this.itemChangeHandler.bind(this);
        this.selectItem = this.selectItem.bind(this);
        currentBudgetCollection = this.state.budgetItemCollection;

    }

    calculateAmount(id, percentage) {
        let currentAmount = this.state.total * percentage;
        return currentAmount;
    }

    setBudgetTotal(amount) {
        this.setState({
            total: amount
        });
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
        currentBudgetCollection[this.selectItem(itemId)]["name"] = itemName;
        currentBudgetCollection[this.selectItem(itemId)]["percent"] = itemPercent;
        this.setState({budgetItemCollection: currentBudgetCollection});
    }

    render() {
        return(
            <div>
                <BudgetInput budgetConfirmHandler={this.setBudgetTotal}/>
                <BudgetItemContainer budgetItemCollection={this.state.budgetItemCollection} itemChangeHandler={this.itemChangeHandler}/>
            </div>
        );
    }

}
export default AppLayout;