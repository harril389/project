import React from "react";

const DetailInfo = props => {
  const { specific_unit, unit, party_union_member, academic_level, native_land, information_family, comment } = props;

  return (
    <div className="box-para-speinfo">
      <div className="box-header">
        <div className="medium-xl-txt">Thông tin chi tiết</div>
      </div>
      <div className="box-body-speinfo">
        <div className="box-content-speinfo">
          <div className="label-speinfo medium-md-txt">Đơn vị học tập/Công tác:</div>
          <div className="value-speinfo regular-md-txt">{unit}</div>
        </div>
        <div className="box-content-speinfo">
          <div className="label-speinfo medium-md-txt">Khoa/Đơn vị cụ thể:</div>
          <div className="value-speinfo regular-md-txt">{specific_unit}</div>
        </div>
        <div className="box-content-speinfo">
          <div className="label-speinfo medium-md-txt">Đoàn viên/Đảng viên:</div>
          <div className="value-speinfo regular-md-txt">{party_union_member}</div>
        </div>
        <div className="box-content-speinfo">
          <div className="label-speinfo medium-md-txt">Trình độ học vấn:</div>
          <div className="value-speinfo regular-md-txt">{academic_level}</div>
        </div>
        <div className="box-content-speinfo">
          <div className="label-speinfo medium-md-txt">Quê quán:</div>
          <div className="value-speinfo regular-md-txt">{native_land}</div>
        </div>
        <div className="box-content-speinfo">
          <div className="label-speinfo medium-md-txt">Thông tin liên hệ gia đình:</div>
          <div className="value-speinfo regular-md-txt">{information_family}</div>
        </div>
        <div className="box-content-speinfo">
          <div className="label-speinfo medium-md-txt">Ghi chú:</div>
          <div className="value-speinfo regular-md-txt">{comment}</div>
        </div>
      </div>
    </div>
  );
};
export default DetailInfo;
