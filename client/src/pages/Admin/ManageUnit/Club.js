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
  FormClub,
  Search,
  SelectOption,
  Toast,
  NoData,
} from "components";
import { AddSVG, SuccessSVG } from "theme/icons";
import { LangConst } from "const";
import { useLocation } from "react-router-dom";
import LayoutUnit from "./layout";
import { useSelector, useDispatch } from "react-redux";
import ClubAction from "redux/club.redux";
import BranchAction from "redux/branch.redux";

const ManageClub = props => {
  const dispatch = useDispatch();

  const [current, setCurrent] = useState(1);
  const currentPath = useLocation().pathname;

  const data = useSelector(state => state.clubRedux?.data);
  const isFetching = useSelector(state => state.clubRedux?.isFetching);
  const createSuccess = useSelector(state => state.clubRedux.createSuccess);
  const dataBranch = useSelector(state => state.branchRedux?.data);

  const [search, setSearch] = useState({
    name_filter: "",
    code_branch_filter: "",
  });

  const onChangeCurrent = async page => {
    setCurrent(page);
  };

  const onCheckSuccess = () => {
    dispatch(ClubAction.clubSuccess({ createSuccess: false }));
  };

  const onChooseBranch = (name, data) => {
    setSearch({ ...search, code_branch_filter: data });
    dispatch(
      ClubAction.getListClub({
        paging: 1,
        size: 10,
        page: 1,
        name_filter: search.name_filter,
        code_branch_filter: data,
      }),
    );
    console.log(data);
  };

  const onSearch = data => {
    setSearch({ ...search, full_name: data });
    dispatch(
      ClubAction.getListClub({
        paging: 1,
        size: 10,
        page: 1,
        name_filter: data,
        code_branch_filter: search.code_branch_filter,
      }),
    );
  };

  useEffect(() => {
    if (!dataBranch) {
      dispatch(BranchAction.getListBranch());
    }
  }, [dataBranch]);

  useEffect(() => {
    if (!data) {
      dispatch(
        ClubAction.getListClub({
          paging: 1,
          size: 10,
          page: 1,
          name_filter: search.name_filter,
          code_branch_filter: search.code_branch_filter,
        }),
      );
    }
  }, [data]);

  return (
    <LayoutUnit
      currentPath={currentPath}
      header={
        <Modal name={<AddSVG />} isIcon={true} title={LangConst.TXT_CREATE_CLUB}>
          <FormClub />
        </Modal>
      }
      title={
        <Search id="search-exam" placeHolder={LangConst.TXT_SEARCH_NAME_EXAM} onInput={value => onSearch(value)} />
      }
      totalClub={data?.total || 0}
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
                <TableColumn>{LangConst.TXT_NAME_CLUB}</TableColumn>
                <TableColumn>{LangConst.TXT_MANAGEMENT_UNIT}</TableColumn>
                <TableColumn>{LangConst.TXT_MANAGER}</TableColumn>
                <TableColumn>
                  <SelectOption
                    defaultValue={LangConst.TXT_BRANCH}
                    value="code_branch"
                    content="code_branch"
                    listOption={dataBranch?.data}
                    onInput={(nameText, value) => onChooseBranch(nameText, value)}
                    padding="0px 15px"
                  />
                </TableColumn>
                <TableColumn>{LangConst.TXT_TRADITIONAL_DAY}</TableColumn>
                <TableColumn>{LangConst.TXT_ADDRESS}</TableColumn>
              </TableRow>
            </TableHeader>
          }
          body={
            <TableBody>
              {data?.data?.length > 0 &&
                data?.data.map((item, index) => (
                  <TableRow key={item?.uid}>
                    <TableCell width="20px" align="center">
                      {index + 1}
                    </TableCell>
                    <TableCell align="left">
                      <Modal name={item?.name_club} title={item?.name_club}>
                        <FormClub dataClub={item} isUpdate={true} name_branch={item?.branch?.code_branch} />
                      </Modal>
                      {item?.code_club}
                    </TableCell>
                    <TableCell align="center">{item?.management_unit}</TableCell>
                    <TableCell>{item?.manager}</TableCell>
                    <TableCell align="center">{item?.branch?.code_branch}</TableCell>
                    <TableCell align="center">{item?.founded_day}</TableCell>
                    <TableCell align="center">{item?.address}</TableCell>
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

export default ManageClub;
