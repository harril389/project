import React from "react";

const CheckBox = props => {
  const { name, onInput, value, uid, content, checked } = props;

  const onChange = () => {
    onInput(value);
  };

  return (
    <div className="para-checkbox">
      <input type="checkbox" name={name} onChange={onChange} value={value} id={uid || ""} checked={checked} />
      <label className="regular-md-txt" htmlFor={uid}>
        {content || ""}
      </label>
    </div>
  );
};

export default CheckBox;
