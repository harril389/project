import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowSVG } from "theme/icons";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import ClubAction from "redux/club.redux";
import BranchAction from "redux/branch.redux";

const DropDownMenu = props => {
  const { name, listMenu, color } = props;
  const currentPath = useLocation().pathname;

  const [open, setOpen] = useState(checkPathExist(listMenu, currentPath));

  return (
    <div className="drop-down-menu">
      <button className={`ddm-button ${open && "ddm-button-btn"}`} type="button" onClick={() => setOpen(!open)}>
        <div className="medium-lg-txt" style={{ color: color }}>
          {name}
        </div>
        <div
          className="icon-arrow-custom"
          style={{
            transform: open ? "rotate(180deg)" : "none",
            color: color,
          }}
        >
          <ArrowSVG />
        </div>
      </button>
      <div className={`menu-link ${open && "visible-display"}`}>
        {listMenu.map((menu, index) => (
          <Link
            key={"link" + index}
            to={menu.pathConst}
            className={`ml-text ${checkPathLayout(currentPath, menu.pathConst, menu.exception) && "ml-text-btn"}`}
          >
            {menu.name}
          </Link>
        ))}
      </div>
    </div>
  );
};
DropDownMenu.defaultProps = { color: "rgba(255,255,255,1)" };

const checkPathExist = (data, currentPath) => {
  let result = data.findIndex(e => e.pathConst === currentPath);
  if (result !== -1) {
    return true;
  } else {
    for (let i = 0; i < data.length; i++) {
      if (data[i].exception && data[i].exception.length > 0) {
        let result = data[i].exception.findIndex(e => e === currentPath);
        if (result !== -1) {
          return true;
        }
      }
    }
    return false;
  }
};

const checkPathLayout = (currentPath, itemPath, exception) => {
  if (currentPath === itemPath) {
    return true;
  } else {
    if (exception && exception.length > 0) {
      let result = exception.findIndex(e => e === currentPath);
      return result === -1 ? false : true;
    } else return false;
  }
};

export default DropDownMenu;

export const ListMenu = props => {
  const { code, name, listMenu, uid, onChange } = props;

  const [open, setOpen] = useState(false);

  const clickChange = value => {
    onChange(value);
  };

  return (
    <div className="para-list-menu">
      <button className={`lm-button ${open && "lm-button-btn"}`} type="button" onClick={() => setOpen(!open)}>
        <div className="medium-lg-txt">{code}</div>
        <div
          className="icon-arrow-lm"
          style={{
            transform: open ? "rotate(180deg)" : "none",
          }}
        >
          <ArrowSVG />
        </div>
      </button>
      <div className={`list-link ${open && "visible-display-1"}`}>
        <ButtonBranch name={name} uid={uid} code={code} onCheck={value => clickChange(value)} />
        {listMenu.map(menu => (
          <ButtonUnit key={menu.uid} data={menu} uid={menu.uid} onCheck={value => clickChange(value)} />
        ))}
      </div>
    </div>
  );
};

const ButtonUnit = props => {
  const dispatch = useDispatch();

  const { data, uid, onCheck } = props;

  const onClick = () => {
    onCheck(true);
    dispatch(
      ClubAction.getClubByUid({
        uid: uid,
      }),
    );
  };

  return (
    <button value={data.code_club} className={`ll-text`} onClick={onClick}>
      <div className="eclipse">{data.name_club}</div>
    </button>
  );
};

const ButtonBranch = props => {
  const dispatch = useDispatch();

  const { name, uid, code, onCheck } = props;

  const onClick = () => {
    onCheck(false);
    dispatch(
      BranchAction.getBranchByUid({
        uid: uid,
      }),
    );
  };

  return (
    <button value={code} className={`ll-text`} onClick={onClick}>
      <div className="eclipse">{name}</div>
    </button>
  );
};
