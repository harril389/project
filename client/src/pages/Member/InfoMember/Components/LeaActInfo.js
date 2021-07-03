import "./style.scss";
import React from "react";
import { Table, TableCell, TableRow, TableBody } from "components";

export const LearnInfo = props => {
  const { name, school, learn } = props;
  return (
    <div className="para-learn-info">
      <div className="box-header">
        <div className="medium-xl-txt">{name}</div>
      </div>
      <div className="box-body">
        <div className="box-content">
          <div className="label-learn medium-md-txt">Trường:</div>
          <div className="value-learn regular-md-txt">{school.school}</div>
        </div>
        <div className="box-content">
          <div className="label-learn medium-md-txt">Lớp:</div>
          <div className="value-learn regular-md-txt">{school.class}</div>
        </div>
        <div className="box-content">
          <div className="label-learn medium-md-txt">Ngành:</div>
          <div className="value-learn regular-md-txt">{school.majors}</div>
        </div>
        <div className="box-content">
          <div className="label-learn medium-md-txt">GPA:</div>
          <div className="value-learn regular-md-txt">{school.gpa}</div>
        </div>
        <div className="box-content">
          <div className="label-learn medium-md-txt">Khen thưởng:</div>
        </div>
        <Table
          body={
            <TableBody>
              <TableRow>
                <TableCell width="20px" align="center">
                  STT
                </TableCell>
                <TableCell width="150px" align="center">
                  Năm học
                </TableCell>
                <TableCell width="150px" align="center">
                  Kỳ học
                </TableCell>
                <TableCell width="150px" align="center">
                  Lý do khen thưởng
                </TableCell>
              </TableRow>
              {learn?.length > 0 &&
                learn.map((item, index) => (
                  <TableRow key={item.uid}>
                    <TableCell width="20px" align="center">
                      {index + 1}
                    </TableCell>
                    <TableCell>{item.learn_school_year}</TableCell>
                    <TableCell>{item.learn_semester}</TableCell>
                    <TableCell align="center">{item.learn_reason}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          }
        />
      </div>
    </div>
  );
};

export const ActivityInfo = props => {
  const { name, activity, club, position, specialized, status_activity } = props;
  return (
    <div className="para-learn-info">
      <div className="box-header">
        <div className="medium-xl-txt">{name}</div>
      </div>
      <div className="box-body">
        <div className="box-content">
          <div className="label-learn medium-md-txt">Trực thuộc chi Hội:</div>
          <div className="value-learn regular-md-txt">{club?.branch.name_branch}</div>
        </div>
        <div className="box-content">
          <div className="label-learn medium-md-txt">Trực thuộc Đội:</div>
          <div className="value-learn regular-md-txt">{club?.name_club}</div>
        </div>
        <div className="box-content">
          <div className="label-learn medium-md-txt">Ngày vào Hội:</div>
          <div className="value-learn regular-md-txt">{club?.time_activity}</div>
        </div>
        <div className="box-content">
          <div className="label-learn medium-md-txt">Chức vụ:</div>
          <div className="value-learn regular-md-txt">{position?.position}</div>
        </div>
        <div className="box-content">
          <div className="label-learn medium-md-txt">Bậc chuyên môn:</div>
          <div className="value-learn regular-md-txt">{specialized?.professional_level}</div>
        </div>
        <div className="box-content">
          <div className="label-learn medium-md-txt">Tình trạng hoạt động:</div>
          <div className="value-learn regular-md-txt">{status_activity ? "Đang hoạt động" : "Nghỉ hoạt động"}</div>
        </div>
        <div className="box-content">
          <div className="label-learn">Khen thưởng:</div>
        </div>
        <Table
          body={
            <TableBody>
              <TableRow>
                <TableCell width="20px" align="center">
                  STT
                </TableCell>
                <TableCell width="150px" align="center">
                  Năm học
                </TableCell>
                <TableCell width="150px" align="center">
                  Kỳ học
                </TableCell>
                <TableCell width="150px" align="center">
                  Lý do khen thưởng
                </TableCell>
              </TableRow>
              {activity?.length > 0 &&
                activity.map((item, index) => (
                  <TableRow key={item.uid}>
                    <TableCell width="20px" align="center">
                      {index + 1}
                    </TableCell>
                    <TableCell>{item.activity_school_year}</TableCell>
                    <TableCell>{item.activity_semester}</TableCell>
                    <TableCell align="center">{item.activity_reason}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          }
        />
      </div>
    </div>
  );
};
