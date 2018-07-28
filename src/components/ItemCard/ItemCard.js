import React, { Component } from "react";
import ClipboardJS from "clipboard";
import "./ItemCard.css";

export default class ItemCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemName: this.props.itemName,
      itemPercentage: this.props.itemPercent
    };
    this.updateName = this.updateName.bind(this);
    this.updatePercentage = this.updatePercentage.bind(this);
    this.updatePercentageBlur = this.updatePercentageBlur.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.returnFunction = this.returnFunction.bind(this);
    new ClipboardJS(".clipbtn");
  }

  updateName(evt) {
    this.setState({ itemName: evt.target.value });
    this.props.itemChangeHandler(
      this.props.itemId,
      this.state.itemName,
      this.state.itemPercentage
    );
    let newWidth =
      "calc(" +
      evt.target.value.length +
      "ch - " +
      evt.target.value.length * 1.4 +
      "px)";
    let inputwidth = document.getElementById("title-" + this.props.itemId);
    inputwidth.style.width = "calc(" + newWidth + " + 10px)";
    console.log("NewWidth: " + newWidth);
  }

  updatePercentageBlur(evt) {
    this.setState({ itemPercentage: parseInt(evt.target.value, 10) });
    this.props.itemChangeHandler(
      this.props.itemId,
      this.state.itemName,
      this.state.itemPercentage
    );
    this.props.calculate();
  }

  updatePercentage(evt) {
    this.setState({ itemPercentage: parseInt(evt.target.value, 10) });
    let targetvalue = parseInt(evt.target.value, 10);
    let newWidth =
      "calc(" +
      targetvalue.toString().length +
      "ch - " +
      targetvalue.toString().length * 1.4 +
      "px)";
    let inputwidth = document.getElementById("input-" + this.props.itemId);
    inputwidth.style.width = newWidth;
    this.props.itemChangeHandler(
      this.props.itemId,
      this.state.itemName,
      this.state.itemPercentage
    );
    this.props.calculate();
  }

  deleteItem() {
    this.props.itemRemoveHandler(this.props.itemId);
  }

  componentDidMount() {
    let percentwidth = document.getElementById("input-" + this.props.itemId);
    let startingWidth =
      "calc(" +
      percentwidth.value.length +
      "ch - " +
      percentwidth.value.length * 1.4 +
      "px)";
    percentwidth.style.width = startingWidth;

    let titlewidth = document.getElementById("title-" + this.props.itemId);
    let titlestartingWidth = titlewidth.value.length + "ch";
    titlewidth.style.width = "calc(" + titlestartingWidth + " + 10px)";
    document.addEventListener("keydown", this.returnFunction, false);
  }

  returnFunction(event) {
    if (event.keyCode === 13) {
      this.setState({
        itemPercentage: parseInt(
          document.getElementById("input-" + this.props.itemId).value,
          10
        )
      });
      this.props.itemChangeHandler(
        this.props.itemId,
        this.state.itemName,
        this.state.itemPercentage
      );
      this.props.calculate();
    }
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.returnFunction, false);
  }

  render() {
    return (
      <div>
        <div className="ItemCard" id={this.props.itemId}>
          <div className="LeftHalf">
            <input
              type="text"
              className="ItemCard__title"
              id={"title-" + this.props.itemId}
              placeholder={this.state.itemName}
              value={this.state.itemName}
              onChange={this.updateName}
            />
            <div className="ItemCard__percentage-container">
              <input
                id={"input-" + this.props.itemId}
                type="number"
                placeholder={this.state.itemPercentage}
                value={this.state.itemPercentage}
                onChange={this.updatePercentage}
                onBlur={this.updatePercentageBlur}
              />
              %
            </div>
          </div>
          <div className="RightHalf">
            <span
              id={"itemTotal" + this.props.itemId}
              className="ItemCard__total clipbtn"
              data-clipboard-action="copy"
              data-clipboard-target={"#itemTotal" + this.props.itemId}
            >
              ${this.props.itemTotal}
            </span>
            <span className="CloseButton">x</span>
          </div>
        </div>
      </div>
    );
  }
}
