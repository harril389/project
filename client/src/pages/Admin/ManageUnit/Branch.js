import React, { useState, useEffect } from "react";
import Pagination from "rc-pagination";
import {
  Modal,
  Table,
  TableCell,
  TableRow,
  TableBody,
  TableHeader,
  TableColumn,
  Spinner,
  FormBranch,
  Toast,
  NoData,
} from "components";
import { AddSVG, SuccessSVG } from "theme/icons";
import { LangConst } from "const";
import { useLocation } from "react-router-dom";
import LayoutUnit from "./layout";
import BranchAction from "redux/branch.redux";
import { useSelector, useDispatch } from "react-redux";

const ManageBranch = props => {
  const [current, setCurrent] = useState(1);
  const currentPath = useLocation().pathname;

  const dispatch = useDispatch();

  const data = useSelector(state => state.branchRedux?.data);
  const isFetching = useSelector(state => state.branchRedux?.isFetching);
  const createSuccess = useSelector(state => state.branchRedux.createSuccess);

  const onChangeCurrent = async page => {
    setCurrent(page);
  };

  const onCheckSuccess = () => {
    dispatch(BranchAction.branchSuccess({ createSuccess: false }));
  };

  useEffect(() => {
    if (!data) {
      dispatch(BranchAction.getListBranch());
    }
  }, [data]);

  return (
    <LayoutUnit
      currentPath={currentPath}
      header={
        <Modal name={<AddSVG />} isIcon={true} title={LangConst.TXT_CREATE_BRANCH}>
          <FormBranch />
        </Modal>
      }
    >
      {isFetching && <Spinner />}
      {createSuccess && (
        <Toast
          title={<SuccessSVG width="50px" height="50px" color="rgba(91, 255, 91,1)" />}
          message={"Success"}
          onChange={onCheckSuccess}
        />
      )}
      <div className="unit">
        <Table
          header={
            <TableHeader>
              <TableRow>
                <TableColumn>{LangConst.TXT_STT}</TableColumn>
                <TableColumn>{LangConst.TXT_NAME_BRANCH}</TableColumn>
                <TableColumn>{LangConst.TXT_MANAGEMENT_UNIT}</TableColumn>
                <TableColumn>{LangConst.TXT_MANAGER}</TableColumn>
                <TableColumn>{LangConst.TXT_TRADITIONAL_DAY}</TableColumn>
                <TableColumn>{LangConst.TXT_TOTAL_MEMBER}</TableColumn>
              </TableRow>
            </TableHeader>
          }
          body={
            <TableBody>
              {data?.data?.length > 0 &&
                data.data.map((item, index) => (
                  <TableRow key={item?.uid}>
                    <TableCell width="20px" align="center">
                      {index + 1}
                    </TableCell>
                    <TableCell>
                      <Modal name={item?.name_branch} title={item?.name_branch}>
                        <FormBranch isUpdate={true} dataBranch={item} />
                      </Modal>
                    </TableCell>
                    <TableCell>{item?.management_unit}</TableCell>
                    <TableCell>{item?.manager}</TableCell>
                    <TableCell align="center">{item?.traditional_day}</TableCell>
                    <TableCell align="center">{item?.member}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          }
        />
        {data?.data?.length === 0 && <NoData />}
        <div className="box-pagination">
          <Pagination
            onChange={onChangeCurrent}
            current={current}
            defaultCurrent={1}
            showTitle={false}
            total={0}
            showQuickJumper
            showLessItems
            locale={"vi_VN"}
          />
        </div>
      </div>
    </LayoutUnit>
  );
};

export default ManageBranch;
