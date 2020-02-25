import * as React from "react";
import FontIcon from "../font-icon/FontIcon";

interface ButtonProps {
  value: string;
  icon?: string;
  iconSize?: string;
  className?: string;

  onClick?(): void;
}

export class AnatoliaButton extends React.Component<ButtonProps, {}> {
  render() {
    return (
      <button className={this.props.className} type={"button"} onClick={this.props.onClick}>
        <FontIcon name={this.props.icon ?? ""}/>
        <span>&nbsp; {this.props.value}</span>
      </button>
    );
  }
}