import React, { useState, useEffect } from "react";
import { MainLayout } from "layouts";
import { LangConst } from "const";
import GroupAction from "redux/group.redux";
import { useSelector, useDispatch } from "react-redux";

const Leader = () => {
  const dispatch = useDispatch();
  const data = useSelector(state => state.groupRedux?.dataLeader);

  useEffect(() => {
    if (!data) {
      dispatch(GroupAction.getLeader());
    }
  }, [data]);

  return (
    <MainLayout name={LangConst.TXT_FORMER_LEADER}>
      {data && data.length > 0 && data.map((item, index) => <InfoLeader leader={item} key={"leader" + index} />)}
    </MainLayout>
  );
};

export const InfoLeader = props => {
  const { leader } = props;
  const [open, setOpen] = useState(false);
  return (
    <div className="para-leader">
      <div className="image">
        <img className="img" src={leader?.image} alt="img" />
      </div>
      <div className="information">
        <label className="label medium-md-txt">{LangConst.TXT_FULL_NAME}:</label>
        <label className="regular-md-txt">{leader?.full_name}</label>
        <br />
        <label className="label medium-md-txt">{LangConst.TXT_POSITION}:</label>
        <label className="regular-md-txt">{leader?.position.position}</label>
        <br />
        <label className="label medium-md-txt">{LangConst.TXT_WORK_TIME}: </label>
        <label className="regular-md-txt">{leader?.time_activity}</label>
        <br />
        <div>
          <div className={`${open ? "open" : "close"} regular-md-txt`} style={{ width: "100%", overflow: "hidden" }}>
            <label className="label medium-md-txt">{LangConst.TXT_INFORMATION_DETAILS}: </label>
            <p>{leader?.comment}</p>
          </div>
          <div className="footer">
            {open ? (
              <button className="button regular-md-txt" onClick={e => setOpen(!open)}>
                Thu gọn
              </button>
            ) : (
              <button className="button regular-md-txt" onClick={e => setOpen(!open)}>
                {LangConst.TXT_DETAILS}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leader;
