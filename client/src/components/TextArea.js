import React, { useState } from "react";

const TextArea = props => {
  const { label, defaultValue, placeHolder, name, onInput, type, requiredInput } = props;

  const [active, setActive] = useState(false);
  const onChange = e => {
    onInput(name, e.target.value);
  };

  return (
    <div className="para-textarea">
      <textarea
        className="textarea"
        id={name}
        name={name}
        required={requiredInput}
        defaultValue={defaultValue}
        type={type}
        // onChange={e => {
        //   onChange(e);
        // }}
        autoComplete="off"
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
      />
      <label className={`label ${active && "active"}`} htmlFor={name}>
        {label}
      </label>
    </div>
  );
};

export default TextArea;
