import React from "react";

const Radio = props => {
  const { name, onInput, value, requiredInput, checked, uid, content } = props;

  const onChange = () => {
    onInput(value);
  };

  return (
    <div className="para-radio">
      <input
        id={uid || ""}
        type="radio"
        name={name}
        onChange={onChange}
        value={value}
        required={requiredInput}
        checked={checked}
      />
      <label className="regular-md-txt" htmlFor={uid}>
        {content || ""}
      </label>
    </div>
  );
};

export default Radio;
