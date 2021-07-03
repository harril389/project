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
  Search,
  FormExam,
  Spinner,
  Dialog,
  NoData,
  Toast,
} from "components";
import LayoutExam from "./layout";
import { AddSVG, TrashSVG, SuccessSVG } from "theme/icons";
import { LangConst } from "const";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ExamAdminAction from "redux/examAdmin.redux";
import { convertTimeUTC } from "utils";

const Exam = props => {
  const dispatch = useDispatch();
  const currentPath = useLocation().pathname;

  const data = useSelector(state => state.examAdminRedux?.data);
  const isFetching = useSelector(state => state.examAdminRedux.isFetching);
  const createSuccess = useSelector(state => state.examAdminRedux.createSuccess);
  const removeSuccess = useSelector(state => state.examAdminRedux.removeSuccess);

  const [current, setCurrent] = useState(1);
  const [search, setSearch] = useState("");

  const onSearch = data => {
    setSearch(data);
    dispatch(
      ExamAdminAction.getListExam({
        paging: 1,
        size: 10,
        page: 1,
        name_exam_filter: data,
      }),
    );
  };

  const onChangeCurrent = async page => {
    setCurrent(page);
    dispatch(
      ExamAdminAction.getListExam({
        paging: 1,
        size: 10,
        page: page,
        name_exam_filter: search,
      }),
    );
  };

  const onCheckSuccess = () => {
    dispatch(ExamAdminAction.examSuccess({ createSuccess: false }));
  };
  const onCheck = () => {
    dispatch(ExamAdminAction.examSuccess({ removeSuccess: false }));
  };

  const deleteExam = uid => {
    dispatch(
      ExamAdminAction.deleteExam({
        paging: 1,
        size: 10,
        page: current,
        uid: uid,
        name_exam_filter: search,
      }),
    );
  };

  useEffect(() => {
    if (!data) {
      dispatch(
        ExamAdminAction.getListExam({
          paging: 1,
          size: 10,
          page: 1,
          name_exam_filter: search,
        }),
      );
    }
  }, [data]);

  return (
    <LayoutExam
      currentPath={currentPath}
      totalExam={data?.total || 0}
      header={
        <Modal name={<AddSVG />} isIcon={true} title={LangConst.TXT_CREATE_EXAM}>
          <FormExam />
        </Modal>
      }
      title={
        <Search id="search-exam" placeHolder={LangConst.TXT_SEARCH_NAME_EXAM} onInput={value => onSearch(value)} />
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
      {removeSuccess && (
        <Toast
          title={<SuccessSVG width="50px" height="50px" color="rgba(91, 255, 91,1)" />}
          message={"Xóa thành công"}
          onChange={onCheck}
        />
      )}
      <div className="exam">
        <Table
          header={
            <TableHeader>
              <TableRow>
                <TableColumn>{LangConst.TXT_STT}</TableColumn>
                <TableColumn>{LangConst.TXT_NAME_EXAM}</TableColumn>
                <TableColumn>{LangConst.TXT_START_TIME}</TableColumn>
                <TableColumn>{LangConst.TXT_END_TIME}</TableColumn>
                <TableColumn>{LangConst.TXT_TIME}</TableColumn>
                <TableColumn>{LangConst.TXT_PASSWORD}</TableColumn>
                <TableColumn>{LangConst.TXT_DESCRIPTION}</TableColumn>
                <TableColumn>{LangConst.TXT_TOTAL_QUESTION}</TableColumn>
                <TableColumn>{LangConst.TXT_STATUS}</TableColumn>
                <TableColumn></TableColumn>
              </TableRow>
            </TableHeader>
          }
          body={
            <TableBody>
              {data?.data?.length > 0 &&
                data.data.map((item, index) => (
                  <TableRow key={item.uid}>
                    <TableCell width="20px" align="center">
                      {index + 1}
                    </TableCell>
                    <TableCell>
                      <Modal name={item.name} title={item.name}>
                        <FormExam uid={item.uid} isUpdate={true} />
                      </Modal>
                    </TableCell>
                    <TableCell>{convertTimeUTC(item.start_time * 1000)}</TableCell>
                    <TableCell>{convertTimeUTC(item.end_time * 1000)}</TableCell>
                    <TableCell>
                      {parseInt(item.time) / 60} {LangConst.TXT_MINUTES}
                    </TableCell>
                    <TableCell>{item.have_password}</TableCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell align="center">{item.total_question}</TableCell>
                    <TableCell align="center">{item.status}</TableCell>
                    <TableCell width="20px" align="center">
                      <Dialog
                        isIcon={true}
                        title={LangConst.TXT_DELETE}
                        name={<TrashSVG />}
                        content={`Xóa đề thi: ${item.name}`}
                        onInput={() => deleteExam(item.uid)}
                      />
                    </TableCell>
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
            total={data?.total || 0}
            showQuickJumper
            showLessItems
            locale={"vi_VN"}
          />
        </div>
      </div>
    </LayoutExam>
  );
};

export default Exam;
