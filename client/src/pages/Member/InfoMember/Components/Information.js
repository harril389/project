import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { EditInfoSVG, GenderSVG, IdCardSVG, PhoneSVG, FacebookSVG, EmailSVG, AddressSVG, DateSVG } from "theme/icons";
import { Modal } from "components";
import EditProfile from "./EditProfile";
import UserAction from "redux/user.redux";

const Information = props => {
  const {
    data,
    code_membership,
    full_name,
    birthday,
    sex,
    image,
    number_blood_donate,
    blood_group,
    rh,
    email,
    phone,
    id_card,
    facebook,
    address,
  } = props;

  const dispatch = useDispatch();
  const img = useSelector(state => state.userRedux?.image);
  const [changeImg, setChangeImg] = useState(false);
  const [imgData, setImgData] = useState(null);

  const onChangePicture = e => {
    if (e.target.files[0]) {
      console.log(e.target.files[0]);
      let reader = new FileReader();
      reader.addEventListener("load", () => {
        setImgData(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
      setChangeImg(true);
      dispatch(UserAction.uploadAvatar(e.target.files[0]));
    }
  };

  return (
    <div className="para-info-user">
      <div className="box-border-member">
        <div className="bbm-button">
          <Modal name={<EditInfoSVG />} isIcon={true}>
            <EditProfile dataMember={data} />
          </Modal>
        </div>
        <div className="box-border-avatar">
          <div
            className="box-avatar"
            style={{
              backgroundImage: changeImg ? `url(${imgData})` : `url(${!img ? image : img})`,
            }}
          >
            <div className="hover-img">
              <input className="upload-img" id="profilePic" type="file" onChange={onChangePicture} />
            </div>
          </div>
        </div>
        <div className="box-content-member">
          <div
            className="box-name-member"
            style={{
              fontSize: "16px",
              fontWeight: 500,
            }}
          >
            {full_name}
          </div>
          <div className="box-name-member">{code_membership}</div>
          <div className="box-topic-member">
            <div className="box-label">Thông tin cá nhân</div>
            <div className="box-line" />
          </div>
          <div className="box-infor-member-1">
            <DateSVG />
            <div className="box-value-member">{birthday}</div>
          </div>
          <div className="box-infor-member-1">
            <GenderSVG />
            <div className="box-value-member">{sex ? "Nam" : "Nữ"}</div>
          </div>
          <div className="box-infor-member-1">
            <IdCardSVG />
            <div className="box-value-member">{id_card}</div>
          </div>
          <div className="box-infor-member-1">
            <PhoneSVG />
            <div className="box-value-member">{phone}</div>
          </div>
          <div className="box-infor-member-1">
            <FacebookSVG />
            <div className="box-value-member">
              <a className="bvm-a" href={facebook} target="_blank">
                {facebook}
              </a>
            </div>
          </div>
          <div className="box-infor-member-1">
            <EmailSVG />
            <div className="box-value-member">{email}</div>
          </div>
          <div className="box-infor-member-1">
            <AddressSVG />
            <div className="box-value-member">{address}</div>
          </div>
          <div className="box-topic-member">
            <div className="box-label">Hiến máu</div>
            <div className="box-line" />
          </div>
          <div className="box-infor-member">
            <div>Số lần hiến máu:</div>
            <div className="box-value-member">{number_blood_donate}</div>
          </div>
          <div className="box-infor-member">
            <div>Nhóm máu:</div>
            <div className="box-value-member">
              {blood_group}
              {rh ? "+" : "-"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Information;
