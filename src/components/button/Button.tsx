import * as React from "react";
import { FontIcon } from "../font-icon/FontIcon";

interface ButtonProps {
  value: string;
  icon?: string;

  onClick?(): void;
}

export class AnatoliaButton extends React.Component<ButtonProps, {}> {
  render() {
    const { icon } = this.props;

    return (
      <button type={"button"} onClick={this.props.onClick}>
        <FontIcon name={this.props.icon ?? ""}/>
        <span>{this.props.value}</span>
      </button>
    );
  }
}