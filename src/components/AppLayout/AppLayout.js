import React, { Component } from 'react';
import BudgetInput from '../BudgetInput/BudgetInput';
import BudgetItemContainer from '../BudgetItemContainer/BudgetItemContainer';
var currentBudgetCollection;

class AppLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            total: 1420,
            budgetItemCollection: [
            {
              name: "Savings",
              id: 1,
              percent: 20,
              total: "",  
            },
            {
                name: "Food",
                id: 2,
                percent: 14,
                total: "",  
              },
        
            ],
        };

        this.calculateAmounts = this.calculateAmounts.bind(this);
        this.setBudgetTotal = this.setBudgetTotal.bind(this);
        this.itemChangeHandler = this.itemChangeHandler.bind(this);
        this.selectItem = this.selectItem.bind(this);
        currentBudgetCollection = this.state.budgetItemCollection;

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

    render() {
        return(
            <div>
                <BudgetInput budgetConfirmHandler={this.setBudgetTotal} currentTotal={this.state.total}/>
                <BudgetItemContainer budgetItemCollection={this.state.budgetItemCollection} itemChangeHandler={this.itemChangeHandler}/>
            </div>
        );
    }

}
export default AppLayout;