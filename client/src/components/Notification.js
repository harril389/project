import React, { useState, useEffect } from "react";
import { LangConst } from "const";

const Notification = props => {
  const { message, duration } = props;

  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), duration);
  }, []);

  return (
    (showToast && (
      <div className="para-notification">
        <div className="notification-notice">{message}</div>
      </div>
    )) ||
    null
  );
};
Notification.defaultProps = {
  duration: 3000,
};
export default Notification;

export const Toast = props => {
  const { title, message, onChange } = props;

  const [open, setOpen] = useState(true);

  const onCheck = () => {
    setOpen(!open);
    onChange();
  };

  return (
    <div className="para-toast" style={{ visibility: open ? "visible" : "hidden" }}>
      <div className="toast">
        <div className="toast-header">{title}</div>
        <div className="toast-body">{message}</div>
        <div className="toast-footer">
          <button className="button-footer" type="button" onClick={onCheck}>
            {LangConst.TXT_OK}
          </button>
        </div>
      </div>
    </div>
  );
};
