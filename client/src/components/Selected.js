import React, { useState } from "react";
import { ArrowSVG } from "theme/icons";

const Selected = props => {
  const { width, nameText, listOption, onInput, defaultValue, listName, color } = props;

  const [open, setOpen] = useState(false);
  const [change, setChange] = useState(defaultValue);
  const [hold, setHold] = useState(false);

  const handleClick = e => {
    e.preventDefault();
    setChange(e.target.name);
    onInput(nameText, parseInt(e.target.value));
    setOpen(false);
  };
  const handleClick1 = option => {
    setChange(option);
    onInput(nameText, option);
    setOpen(false);
  };

  return (
    <div className="root-select" style={{ width: width }}>
      <button
        type="button"
        style={{ backgroundColor: color }}
        className="button"
        onClick={() => setOpen(true)}
        onBlur={() => setOpen(hold)}
      >
        <div className="label semiBold-md-txt">{change}</div>
        <div className="arrow" style={{ transform: open ? "rotate(180deg)" : "none" }}>
          <ArrowSVG />
        </div>
      </button>
      <div
        className="main"
        style={{ display: open ? "block" : "none" }}
        tabIndex="0"
        onMouseEnter={() => setHold(true)}
        onMouseLeave={() => setHold(false)}
        onBlur={() => setOpen(false)}
      >
        {listOption &&
          listOption.map((option, index) => (
            <button
              key={nameText + index}
              type="button"
              onClick={e => handleClick(e)}
              name={option.name}
              value={option.id}
            >
              <b>id:</b>
              {option.id}/ {option.name}
            </button>
          ))}

        {listName &&
          listName.map((option, index) => (
            <button key={nameText + index} type="button" onClick={e => handleClick1(option)} value={option}>
              <b>{option}</b>
            </button>
          ))}
        <button className="semiBold-md-txt" type="button" onClick={e => handleClick(e)} name={change} value={change}>
          {change}
        </button>
      </div>
    </div>
  );
};

Selected.defaultProps = { color: "rgba(232, 232, 236, 1)" };

export default Selected;

export const SelectOption = props => {
  const { width, nameText, listOption, onInput, defaultValue, padding, value, content } = props;

  const [open, setOpen] = useState(false);
  const [change, setChange] = useState(defaultValue);
  const [hold, setHold] = useState(false);

  const onClick = e => {
    setChange(e.target.name);
    onInput(nameText, e.target.value);
    setOpen(false);
  };

  return (
    <div className="root-select">
      <button
        type="button"
        style={{ backgroundColor: "rgba(255,255,255,1)", padding: padding }}
        className="button"
        onClick={() => setOpen(true)}
        onBlur={() => setOpen(hold)}
      >
        <div className="label semiBold-md-txt eclipse-hidden">{change}</div>
        <div className="arrow" style={{ transform: open ? "rotate(180deg)" : "none" }}>
          <ArrowSVG />
        </div>
      </button>
      <div
        className="main"
        style={{ width: width, display: open ? "block" : "none" }}
        tabIndex="0"
        onMouseEnter={() => setHold(true)}
        onMouseLeave={() => setHold(false)}
        onBlur={() => setOpen(false)}
      >
        <button className="semiBold-md-txt" type="button" onClick={e => onClick(e)} name={defaultValue} value="">
          {defaultValue}
        </button>
        {listOption &&
          listOption.length > 0 &&
          listOption.map(option => (
            <button
              key={option.uid}
              type="button"
              onClick={e => onClick(e)}
              name={option[content]}
              value={option[value]}
            >
              {option[content]}
            </button>
          ))}
      </div>
    </div>
  );
};

SelectOption.defaultProps = {
  padding: "10px 15px",
  value: "uid",
  content: "type",
};
