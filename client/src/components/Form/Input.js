import React, { useState } from "react";
// import { ArrowSVG } from "../theme/icons";

const Input = props => {
  const { label, defaultValue, placeHolder, name, onInput, type, requiredInput, min, max, uuid } = props;

  const onChange = e => {
    onInput(name, e.target.value);
  };

  return (
    <div className="custom-input">
      {label && (
        <label htmlFor={uuid} className="medium-md-txt">
          {label}:
        </label>
      )}
      <input
        placeholder={placeHolder}
        id={uuid}
        name={name}
        required={requiredInput}
        value={defaultValue}
        type={type}
        min={min}
        max={max}
        onChange={e => {
          onChange(e);
        }}
        autoComplete="off"
      />
    </div>
  );
};

Input.defaultProps = {
  defaultValue: "",
};

export default Input;

export const InputSelect = props => {
  //   const { tags } = props;
  //   return (
  //     <div className="para-input-select">
  //       <div>
  //         {tags.map((item, index) => (
  //           <div key={index}>{item.name}</div>
  //         ))}
  //       </div>
  //     </div>
  //   );
};

export const TextField = props => {
  const { label, value, placeHolder, name, onInput, type, requiredInput } = props;

  const [active, setActive] = useState(value ? true : false);
  const [input, setInput] = useState(value);
  const onChange = e => {
    onInput(name, e.target.value);
  };

  return (
    <div className="para-textfield">
      <input
        className="input"
        placeholder={placeHolder}
        id={name}
        name={name}
        required={requiredInput}
        defaultValue={input}
        type={type}
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
        onChange={e => {
          onChange(e);
        }}
        autoComplete="off"
      />
      <label className={`label ${active && "active"}`} htmlFor={name}>
        {label}
      </label>
    </div>
  );
};
TextField.defaultProps = { value: "" };

export const InputText = props => {
  const { icon, defaultValue, placeHolder, name, onInput, type, requiredInput, notification, min, max, checkText } =
    props;

  const [check, setCheck] = useState(checkText);

  const onChange = e => {
    onInput(name, e.target.value);
    if (e.target.value.length === 0) {
      setCheck(true);
    } else {
      setCheck(false);
    }
  };

  return (
    <div className="para-input-text">
      <div className="input-text">
        <div className="icon-input">{icon}</div>
        <input
          className={`main-input ${check ? "btn-input" : "default-input"}`}
          placeholder={placeHolder}
          name={name}
          required={requiredInput}
          defaultValue={defaultValue}
          type={type}
          min={min}
          max={max}
          onChange={e => {
            onChange(e);
          }}
          autoComplete="off"
        />
      </div>
      {check && <label className="label-notification">{notification}</label>}
    </div>
  );
};

InputText.defaultProps = { checkText: false };

export const InputRange = props => {
  const { onInput, min, max } = props;

  const [value, setValue] = useState({
    min: "",
    max: "",
  });

  const onChange = e => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const onKeyUpInput = event => {
    if (event.key?.toLowerCase() === "enter" || event.keyCode === 13) {
      onInput(value);
    }
  };

  return (
    <div className="Input-range">
      <input
        name="min"
        type="number"
        min={min}
        max={max}
        onChange={e => {
          onChange(e);
        }}
        onKeyUp={onKeyUpInput}
        autoComplete="off"
      />
      <div>-</div>
      <input
        name="max"
        type="number"
        min={min}
        max={max}
        onChange={e => {
          onChange(e);
        }}
        onKeyUp={onKeyUpInput}
        autoComplete="off"
      />
    </div>
  );
};

export const InputNumber = props => {
  const { onInput, min, max, name, placeholder } = props;

  const onKeyUpInput = event => {
    if (event.key?.toLowerCase() === "enter" || event.keyCode === 13) {
      onInput(event.target.value);
    }
  };

  return (
    <input
      className="Input-number"
      placeholder={placeholder}
      name={name}
      type="number"
      min={min}
      max={max}
      onKeyUp={onKeyUpInput}
      autoComplete="off"
    />
  );
};
