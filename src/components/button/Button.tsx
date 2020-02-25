import * as React from "react";

interface ButtonProps {
  value: string;
  icon?: string;

  onClick?(): void;
}

export class AnatoliaButton extends React.Component<ButtonProps, {}> {
  render() {
    return (
      <button type={"button"} onClick={this.props.onClick}>
        {this.props.value}
      </button>
    );
  }
}