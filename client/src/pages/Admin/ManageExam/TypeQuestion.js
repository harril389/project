import React, { useState, useEffect } from "react";
import Pagination from "rc-pagination";
import {
  Modal,
  Table,
  TableCell,
  TableRow,
  TableBody,
  FormTypeQuestion,
  Spinner,
  Dialog,
  TableHeader,
  TableColumn,
  Search,
  Toast,
  NoData,
} from "components";
import LayoutExam from "./layout";
import { AddSVG, TrashSVG, SuccessSVG } from "theme/icons";
import { LangConst } from "const";
import { useLocation } from "react-router-dom";
import TypeQuestionAction from "redux/typeQuestion.redux";
import { useSelector, useDispatch } from "react-redux";
import { convertTime } from "utils";

const TypeQuestion = props => {
  const dispatch = useDispatch();

  const data = useSelector(state => state.typeQuestionRedux?.data);
  const isFetching = useSelector(state => state.typeQuestionRedux.isFetching);
  const removeSuccess = useSelector(state => state.typeQuestionRedux.removeSuccess);
  const createSuccess = useSelector(state => state.typeQuestionRedux.createSuccess);

  const [current, setCurrent] = useState(1);
  const currentPath = useLocation().pathname;
  const [search, setSearch] = useState("");

  const onCheck = () => {
    dispatch(TypeQuestionAction.getListTypeQuestionSuccess({ removeSuccess: false }));
  };

  const onCheckSuccess = () => {
    dispatch(TypeQuestionAction.getListTypeQuestionSuccess({ createSuccess: false }));
  };

  const onSearch = data => {
    setSearch(data);
    dispatch(
      TypeQuestionAction.getListTypeQuestion({
        type_filter: data,
        paging: 1,
        size: 10,
        page: current,
      }),
    );
  };

  const onChangeCurrent = page => {
    setCurrent(page);
    dispatch(
      TypeQuestionAction.getListTypeQuestion({
        type_filter: search,
        paging: 1,
        size: 10,
        page: page,
      }),
    );
  };

  const deleteTypeQuestion = uid => {
    dispatch(
      TypeQuestionAction.removeTypeQuestion({
        type_filter: search,
        paging: 1,
        size: 10,
        page: current,
        uid: uid,
      }),
    );
  };

  useEffect(() => {
    if (!data) {
      dispatch(
        TypeQuestionAction.getListTypeQuestion({
          type_filter: "",
          paging: 1,
          size: 10,
          page: 1,
        }),
      );
    }
  }, [data]);

  return (
    <LayoutExam
      currentPath={currentPath}
      header={
        <Modal name={<AddSVG />} isIcon={true} title={LangConst.TXT_CREATE_EXAM}>
          <FormTypeQuestion />
        </Modal>
      }
      totalTypeQuestion={data?.total || 0}
      title={
        <Search
          id="search-type-question"
          placeHolder={LangConst.TXT_SEARCH_NAME_TYPE_QUESTION}
          onInput={value => onSearch(value)}
        />
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
      <div className="exam">
        <Table
          header={
            <TableHeader>
              <TableRow>
                <TableColumn>{LangConst.TXT_STT}</TableColumn>
                <TableColumn>{LangConst.TXT_TYPE_QUESTION}</TableColumn>
                <TableColumn>{LangConst.TXT_DESCRIPTION}</TableColumn>
                <TableColumn>{LangConst.TXT_CREATE_AT}</TableColumn>
                <TableColumn>{LangConst.TXT_UPDATE_AT}</TableColumn>
                <TableColumn></TableColumn>
              </TableRow>
            </TableHeader>
          }
          body={
            <TableBody>
              {data?.data?.length > 0 &&
                data.data.map((item, index) => (
                  <TableRow key={"table2" + index}>
                    <TableCell width="20px" align="center">
                      {index + 1}
                    </TableCell>
                    <TableCell width="300px">
                      <Modal name={item?.type} title={item.type}>
                        <FormTypeQuestion typeQuestion={item} update={true} />
                      </Modal>
                    </TableCell>
                    <TableCell>{item?.description}</TableCell>
                    <TableCell align="center">{convertTime(item?.createdAt)}</TableCell>
                    <TableCell align="center">{convertTime(item?.updatedAt)}</TableCell>
                    <TableCell width="20px" align="center">
                      {removeSuccess && (
                        <Toast
                          title={<SuccessSVG width="50px" height="50px" color="rgba(91, 255, 91,1)" />}
                          message={"Xóa thành công"}
                          onChange={onCheck}
                        />
                      )}
                      <Dialog
                        isIcon={true}
                        title={LangConst.TXT_DELETE}
                        name={<TrashSVG />}
                        content={`Xóa loại câu hỏi: ${item.type}`}
                        onInput={() => deleteTypeQuestion(item.uid)}
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
            showLessItems
            showQuickJumper
            locale={"vi_VN"}
          />
        </div>
      </div>
    </LayoutExam>
  );
};

export default TypeQuestion;
