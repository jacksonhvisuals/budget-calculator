import React, { Component } from 'react';
import './BudgetItemContainer.css';
import ItemInput from '../ItemInput/ItemInput';

export default class BudgetItemContainer extends Component {

    render(props) {
      if (this.props.budgetItemCollection) {
        return(
          <div className='list-container'>
            {
              this.props.budgetItemCollection.map((item) => {
                return(
                  <ItemInput key={item.id} itemId={item.id} itemName={item.name} itemPercent={item.percent} itemTotal={item.total} itemChangeHandler={this.props.itemChangeHandler}/>
                )
              })
            }
          </div>
        );
      } else {
          return null;
      }
    }
  }
  