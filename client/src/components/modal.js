import React, { useState } from "react";
import { CloseSVG } from "theme/icons";

const Modal = props => {
  const { name, title, children, clickChange, isIcon } = props;
  const [open, setOpen] = useState(false);
  const reloadPage = e => {
    setOpen(false);
    // clickChange(e);
  };
  return (
    <div className="para-modal">
      <button type="button" className={isIcon ? "icon-button" : "button"} onClick={e => setOpen(true)}>
        {name}
      </button>
      <div className="modal-border" style={{ display: open ? "block" : "none" }}>
        <div className="modal-header">
          <button
            type="button"
            className="icon-button"
            onClick={e => {
              reloadPage(e);
            }}
          >
            <CloseSVG />
          </button>
          <div className="modal-title">{title}</div>
        </div>
        {open && <div className="modal-body">{children}</div>}
        <div className="modal-footer"></div>
      </div>
    </div>
  );
};

Modal.defaultProps = { isIcon: false };

export default Modal;
