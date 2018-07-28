import React, { Component } from "react";
import "./ItemCardContainer.css";
import ItemCard from "../ItemCard/ItemCard";

export default class ItemCardContainer extends Component {
  render(props) {
    if (this.props.budgetItemCollection) {
      return (
        <div className="ListContainer">
          {this.props.budgetItemCollection.map(item => {
            return (
              <ItemCard
                key={item.id}
                itemId={item.id}
                itemName={item.name}
                itemPercent={item.percent}
                calculate={this.props.calculate}
                itemTotal={item.total}
                itemClickHandler={this.props.copyTotal}
                itemChangeHandler={this.props.itemChangeHandler}
                itemRemoveHandler={this.props.deleteItemHandler}
              />
            );
          })}
        </div>
      );
    } else {
      return null;
    }
  }
}
