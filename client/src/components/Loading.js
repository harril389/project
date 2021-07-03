import React from "react";
import { LangConst } from "const";
const Loading = props => {
  const { name } = props;
  return (
    <div className="para-loading">
      <div className="main">
        <div className="name regular-lg-txt">{name || LangConst.TXT_PROGRESS}</div>
        <div className="loading">
          <div className="letter-holder">
            <div className="l-1 letter regular-lg-txt">L</div>
            <div className="l-2 letter regular-lg-txt">o</div>
            <div className="l-3 letter regular-lg-txt">a</div>
            <div className="l-4 letter regular-lg-txt">d</div>
            <div className="l-5 letter regular-lg-txt">i</div>
            <div className="l-6 letter regular-lg-txt">n</div>
            <div className="l-7 letter regular-lg-txt">g</div>
            <div className="l-8 letter regular-lg-txt">.</div>
            <div className="l-9 letter regular-lg-txt">.</div>
            <div className="l-10 letter regular-lg-txt">.</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
