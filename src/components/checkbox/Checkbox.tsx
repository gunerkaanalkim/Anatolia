import * as React from "react";

interface CheckboxProps {
  checked: boolean;
  className?: string;
  label?: string;
  elementId?: string;

  onChange(e: any): void;
}

export class Checkbox extends React.Component<CheckboxProps, {}> {
  render() {
    return (
      <div>
        <input id={this.props.elementId}
               className={this.props.className}
               type={"checkbox"}
               onClick={this.props.onChange}
               defaultChecked={this.props.checked}
        />
        {
          this.props.label && <label htmlFor={this.props.elementId}>{this.props.label}</label>
        }
      </div>
    );
  }
}

export default Checkbox;