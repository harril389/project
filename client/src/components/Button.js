import React from "react";

const Button = props => {
  const { type, name, color, width, ...defaultProps } = props;

  return (
    <button
      className="para-button semiBold-md-txt"
      type={type}
      style={{ backgroundColor: color, width: width }}
      {...defaultProps}
    >
      {name}
    </button>
  );
};
Button.defaultProps = { color: "rgba(1, 204, 232, 1)" };
export default Button;

export const ButtonIcon = props => {
  const { type, icon, value, onInput } = props;

  const onClick = () => {
    onInput(value);
  };

  return (
    <button className="para-button-icon" type={type} onClick={onClick} value={value}>
      {icon}
    </button>
  );
};
