import React, { useEffect } from "react";
import { MainLayout } from "layouts";
import { LangConst } from "const";
import { Table, TableCell, TableRow, TableBody } from "components";
import { useSelector, useDispatch } from "react-redux";
import GroupAction from "redux/group.redux";

const Organization = () => {
  const dispatch = useDispatch();
  const association = useSelector(state => state.groupRedux?.data);

  useEffect(() => {
    if (!association) {
      dispatch(GroupAction.getGroup());
    }
  }, [association]);

  return (
    <MainLayout name={LangConst.TXT_INTRO_BLOOD}>
      <div className="para-organization">
        <div className="body-intro">
          <div className="content-intro">
            <div style={{ width: "100%", display: "flex", flexWrap: "wrap" }}>
              <div className="information">
                <span className="span-label medium-lg-txt">{LangConst.TXT_ASSOCIATION_STAnDING_COMMITTEE}</span>
                <div>
                  <div className="list-name-intro">
                    <span className="span-label medium-md-txt">{LangConst.TXT_ASSOCIATION_PRESIDENT}:</span>
                    <span className="span-content">
                      <label className="regular-md-txt">{association?.chairman}</label>
                    </span>
                  </div>
                  <div className="list-name-intro">
                    <span className="span-label medium-md-txt">{LangConst.TXT_ASSOCIATION_VICE_PRESIDENT}:</span>
                    <span className="span-content">
                      <label className="regular-md-txt">{association?.vice_chairman_1}</label>
                    </span>
                  </div>
                  <div className="list-name-intro">
                    <span className="span-label medium-md-txt">{LangConst.TXT_ASSOCIATION_VICE_PRESIDENT}:</span>
                    <span className="span-content">
                      <label className="regular-md-txt">{association?.vice_chairman_2}</label>
                    </span>
                  </div>
                  <div className="list-name-intro">
                    <span className="span-label medium-md-txt">{LangConst.TXT_ASSOCIATION_VICE_PRESIDENT}:</span>
                    <span className="span-content">
                      <label className="regular-md-txt">{association?.vice_chairman_3}</label>
                    </span>
                  </div>
                  <div className="list-name-intro">
                    <span className="span-label medium-md-txt">{LangConst.TXT_ASSOCIATION_VICE_PRESIDENT}:</span>
                    <span className="span-content">
                      <label className="regular-md-txt">{association?.vice_chairman_4}</label>
                    </span>
                  </div>
                  <div className="list-name-intro">
                    <span className="span-label medium-md-txt">{LangConst.TXT_STANDING_COMMITTEE_MEMBERS}:</span>
                    <span className="span-content">
                      <label className="regular-md-txt">{association?.prestige_1}</label>
                    </span>
                  </div>
                  <div className="list-name-intro">
                    <span className="span-label medium-md-txt">{LangConst.TXT_STANDING_COMMITTEE_MEMBERS}:</span>
                    <span className="span-content">
                      <label className="regular-md-txt">{association?.prestige_2}</label>
                    </span>
                  </div>
                </div>
                <div style={{ display: "flex" }}>
                  <div className="span-label medium-md-txt">{LangConst.TXT_FOUNDED_DAY}: </div>
                  <div className="span-content">
                    <label className="regular-md-txt">{association?.founded_year}</label>
                  </div>
                </div>
                <div style={{ display: "flex" }}>
                  <div className="span-label medium-md-txt">{LangConst.TXT_TRADITIONAL_DAY}: </div>
                  <div className="span-content">
                    <label className="regular-md-txt">{association?.traditional_day}</label>
                  </div>
                </div>
              </div>
              <div className="logo-intro">
                <img className="img-intro" src="/logomau.png" alt="logo" />
                <div className="a-intro">
                  <a href="/gioi-thieu-ve-hoi-chi-tiet">{LangConst.TXT_GROUP_BLOOD}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Table
          body={
            <TableBody>
              <TableRow>
                <TableCell width="500px" align="left">
                  {LangConst.TXT_NEWBIE}
                </TableCell>
                <TableCell width="50px" align="center">
                  {association?.sympathizer}
                </TableCell>
                <TableCell width="500px" align="left">
                  {LangConst.TXT_VOLUNTEER}
                </TableCell>
                <TableCell width="50px" align="center">
                  {association?.volunteer}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">{LangConst.TXT_MEMBER}</TableCell>
                <TableCell width="50px" align="center">
                  {association?.member}
                </TableCell>
                <TableCell align="left">{LangConst.TXT_STAFF_STRENGTHENED}</TableCell>
                <TableCell width="50px" align="center">
                  {association?.staff_strengthened}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">{LangConst.TXT_COACH}</TableCell>
                <TableCell width="50px" align="center">
                  {association?.coach}
                </TableCell>
                <TableCell align="left">{LangConst.TXT_INSTRUCTOR}</TableCell>
                <TableCell width="50px" align="center">
                  {association?.instructor}
                </TableCell>
              </TableRow>
            </TableBody>
          }
        />
      </div>
    </MainLayout>
  );
};

export default Organization;
