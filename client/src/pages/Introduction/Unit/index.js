import React, { useState, useEffect } from "react";
import { MainLayout } from "layouts";
import { ListMenu } from "components";
import InformationClub from "./Components/InformationClub";
import InformationBranch from "./Components/InformationBranch";
import BranchAction from "redux/branch.redux";
import { useSelector, useDispatch } from "react-redux";

const Unit = () => {
  const dataClub = useSelector(state => state.clubRedux?.dataByUid);
  const dataBranch = useSelector(state => state.branchRedux?.dataByUid);

  const dispatch = useDispatch();

  const data = useSelector(state => state.branchRedux?.data);

  const [check, setCheck] = useState(false);

  console.log(data);

  useEffect(() => {
    if (!data) {
      dispatch(BranchAction.getListBranch());
    }
  }, [data]);

  return (
    <MainLayout name={"Hồ sơ đơn vị"}>
      <div className="para-unit">
        <div className="menu-left">
          {data?.data?.length > 0 &&
            data?.data.map(item => (
              <ListMenu
                key={item.uid}
                code={item.code_branch}
                name={item.name_branch}
                uid={item.uid}
                listMenu={item.clubs}
                onChange={value => setCheck(value)}
              />
            ))}
        </div>
        <div className="content-right">
          {check ? <InformationClub data={dataClub} /> : <InformationBranch data={dataBranch} />}
        </div>
      </div>
    </MainLayout>
  );
};

export default Unit;
