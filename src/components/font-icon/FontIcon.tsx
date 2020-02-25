import "font-awesome/css/font-awesome.min.css";
import * as React from "react";

interface FontIconProps {
  name: string;
}

export const FontIcon = (props: FontIconProps) => {
  return (
    <i className={props.name}/>
  );
};
