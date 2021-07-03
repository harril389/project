import React, { useEffect } from "react";
import { MainLayout } from "layouts";
import Information from "./Components/Information";
import DetailInfo from "./Components/DetailInfo";
import { LearnInfo, ActivityInfo } from "./Components/LeaActInfo";
import UserAction from "redux/user.redux";
import { useSelector, useDispatch } from "react-redux";
import { Toast } from "components";
import { SuccessSVG } from "theme/icons";

const InfoMember = () => {
  const dispatch = useDispatch();

  const data = useSelector(state => state.userRedux?.dataMember);
  const isUpdateUserMemberSuccess = useSelector(state => state.userRedux?.isUpdateUserMemberSuccess);

  const onCheckSuccess = () => {
    dispatch(UserAction.userSuccess({ isUpdateUserMemberSuccess: false }));
  };
  useEffect(() => {
    if (!data) {
      dispatch(UserAction.getMember());
    }
  }, [data]);

  return (
    <MainLayout name={"Hồ sơ cá nhân"}>
      {data && (
        <div className="para-member">
          {isUpdateUserMemberSuccess && (
            <Toast
              title={<SuccessSVG width="50px" height="50px" color="rgba(91, 255, 91,1)" />}
              message={"Success"}
              onChange={onCheckSuccess}
            />
          )}
          <div className="member-left">
            <Information
              data={data}
              code_membership={data?.code_membership}
              full_name={data?.full_name}
              birthday={data?.birthday}
              sex={data?.sex}
              image={data?.image}
              number_blood_donate={data?.number_blood_donate}
              blood_group={data?.blood_group}
              rh={data?.rh}
              email={data?.email}
              phone={data?.phonee}
              id_card={data?.id_card}
              facebook={data?.facebook}
              address={data?.address}
            />
          </div>
          <div className="member-right">
            <DetailInfo
              unit={data?.unit}
              specific_unit={data?.specific_unit}
              party_union_member={data?.party_union_member}
              academic_level={data?.academic_level}
              native_land={data?.native_land}
              information_family={data?.information_family}
              comment={data?.comment}
            />
            <LearnInfo name="Học tập" school={data?.school} learn={data?.learns} />
            <ActivityInfo
              name="Hoạt động"
              activity={data?.activitys}
              club={data?.club}
              position={data?.position}
              specialized={data?.specialized}
              status_activity={data?.status_activity}
            />
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default InfoMember;
