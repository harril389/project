import React, { useState } from "react";
import { LangConst } from "const";
import { CloseSVG } from "theme/icons";

const Dialog = props => {
  const { name, content, onInput, uid, title, isIcon } = props;
  const [open, setOpen] = useState(false);

  const onClick = () => {
    onInput(uid);
    setOpen(!open);
  };

  return (
    <div className="para-dialog">
      <button className={`${isIcon ? "icon" : "button"}`} type="button" onClick={() => setOpen(!open)}>
        {name}
      </button>
      <div className="dialog" style={{ visibility: open ? "visible" : "hidden" }}>
        <div className="dialog-border">
          <div className="dialog-header">{title}</div>
          <div className="dialog-body">{content}</div>
          <div className="dialog-footer">
            <button className="button-footer btn-button" type="button" onClick={() => setOpen(!open)}>
              {LangConst.TXT_CANCEL}
            </button>
            <button className="button-footer" type="button" onClick={onClick}>
              {LangConst.TXT_CONFIRM}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

Dialog.defaultProps = {
  isIcon: false,
};

export default Dialog;

export const DialogForm = props => {
  const { name, content, title, isIcon } = props;
  const [open, setOpen] = useState(false);

  return (
    <div className="para-dialog-form">
      <button className={`${isIcon ? "icon-form" : "button-form"}`} type="button" onClick={() => setOpen(!open)}>
        {name}
      </button>
      <div className="dialog-form" style={{ visibility: open ? "visible" : "hidden" }}>
        <div className="dialog-border-form">
          <div className="dialog-header-form">
            <div>{title}</div>
            <button className="icon-form" type="button" onClick={() => setOpen(!open)}>
              <CloseSVG />
            </button>
          </div>
          {open && <div className="dialog-body-form">{content}</div>}
        </div>
      </div>
    </div>
  );
};

DialogForm.defaultProps = {
  isIcon: false,
};

export const DialogChange = props => {
  const { name, content, title, isIcon } = props;
  const [open, setOpen] = useState(false);

  return (
    <div className="para-dialog-form">
      <button className={`${isIcon ? "icon-pass" : "button-form"}`} type="button" onClick={() => setOpen(!open)}>
        {name}
      </button>
      <div className="dialog-form" style={{ visibility: open ? "visible" : "hidden" }}>
        <div className="dialog-border-form">
          <div className="dialog-header-form">
            <div>{title}</div>
            <button className="icon-form" type="button" onClick={() => setOpen(!open)}>
              <CloseSVG />
            </button>
          </div>
          {open && <div className="dialog-body-form">{content}</div>}
        </div>
      </div>
    </div>
  );
};

DialogChange.defaultProps = {
  isIcon: false,
};
