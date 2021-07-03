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
  Filter,
  SelectOption,
  Search,
  QuestionOneAnswer,
  QuestionMultiAnswer,
  Spinner,
  Dialog,
  InputRange,
  Toast,
  NoData,
} from "components";
import LayoutExam from "./layout";
import { AddSVG, TrashSVG, ErrorSVG, SuccessSVG } from "theme/icons";
import { useSelector, useDispatch } from "react-redux";
import QuestionAction from "redux/question.redux";
import TypeQuestionAction from "redux/typeQuestion.redux";
import { LangConst } from "const";
import { useLocation } from "react-router-dom";
import { convertTime } from "utils";

const Question = props => {
  const currentPath = useLocation().pathname;

  const dispatch = useDispatch();
  const listTypeQuestion = useSelector(state => state.typeQuestionRedux?.data);
  const data = useSelector(state => state.questionRedux?.data);
  const isFetching = useSelector(state => state.questionRedux.isFetching);
  const removeSuccess = useSelector(state => state.questionRedux.removeSuccess);
  const createSuccess = useSelector(state => state.questionRedux.createSuccess);

  const [current, setCurrent] = useState(1);
  const [search, setSearch] = useState("");
  const [searchTypeQuestion, setSearchTypeQuestion] = useState("");
  const [rangePoint, setRangePoint] = useState({
    min: "",
    max: "",
  });

  const onCheck = () => {
    dispatch(QuestionAction.removeQuestionSuccess({ removeSuccess: false }));
  };

  const onCheckSuccess = () => {
    dispatch(QuestionAction.questionSuccess({ createSuccess: false }));
  };

  const onSearch = data => {
    setSearch(data);
    dispatch(
      QuestionAction.getListQuestion({
        paging: 1,
        size: 10,
        page: 1,
        filter: data,
        type_question_uid: searchTypeQuestion,
        point_start: rangePoint.min,
        point_end: rangePoint.max,
      }),
    );
  };

  const onChoose = (name, data) => {
    setSearchTypeQuestion(data);
    dispatch(
      QuestionAction.getListQuestion({
        paging: 1,
        size: 10,
        page: 1,
        filter: search,
        type_question_uid: data,
        point_start: rangePoint.min,
        point_end: rangePoint.max,
      }),
    );
  };

  const onChooseRange = data => {
    setRangePoint({ ...data });
    dispatch(
      QuestionAction.getListQuestion({
        paging: 1,
        size: 10,
        page: 1,
        filter: search,
        type_question_uid: searchTypeQuestion,
        point_start: data.min,
        point_end: data.max,
      }),
    );
  };

  const onChangeCurrent = page => {
    setCurrent(page);
    dispatch(
      QuestionAction.getListQuestion({
        paging: 1,
        size: 10,
        page: page,
        filter: search,
        type_question_uid: searchTypeQuestion,
        point_start: rangePoint.min,
        point_end: rangePoint.max,
      }),
    );
  };

  const deleteQuestion = uid => {
    dispatch(
      QuestionAction.removeQuestion({
        paging: 1,
        size: 10,
        page: current,
        uid: uid,
        filter: search,
        type_question_uid: searchTypeQuestion,
        point_start: rangePoint.min,
        point_end: rangePoint.max,
      }),
    );
  };

  useEffect(() => {
    if (!listTypeQuestion) {
      dispatch(
        TypeQuestionAction.getListTypeQuestion({
          type_filter: "",
          paging: 0,
          size: 10,
          page: 1,
        }),
      );
    }
  }, [listTypeQuestion]);

  useEffect(() => {
    if (!data) {
      dispatch(
        QuestionAction.getListQuestion({
          paging: 1,
          size: 10,
          page: 1,
          filter: search,
          type_question_uid: searchTypeQuestion,
          point_start: rangePoint.min,
          point_end: rangePoint.max,
        }),
      );
    }
  }, [data]);

  return (
    <LayoutExam
      currentPath={currentPath}
      totalQuestion={data?.total || 0}
      header={
        <Modal name={<AddSVG />} isIcon={true} title="Thêm câu hỏi">
          {listTypeQuestion?.data.length > 0 && (
            <div>
              <QuestionOneAnswer typeQuestion={listTypeQuestion} />
              <QuestionMultiAnswer typeQuestion={listTypeQuestion} />
            </div>
          )}
        </Modal>
      }
      title={
        <Search
          id="search-question"
          placeHolder={LangConst.TXT_SEARCH_NAME_QUESTION}
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
                <TableColumn>{LangConst.TXT_INDEX_QUESTION}</TableColumn>
                <TableColumn>
                  <Filter title={LangConst.TXT_TOTAL_POINT} padding="0px 15px">
                    <InputRange onInput={value => onChooseRange(value)} />
                  </Filter>
                </TableColumn>
                <TableColumn>
                  <SelectOption
                    defaultValue={LangConst.TXT_TYPE_QUESTION}
                    listOption={listTypeQuestion?.data}
                    onInput={(nameText, value) => onChoose(nameText, value)}
                    padding="0px 15px"
                  />
                </TableColumn>
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
                    <TableCell width="400px">
                      <Modal name={item?.question_text} title={item.name}>
                        {item.is_many_correct ? (
                          <QuestionMultiAnswer question={item} typeQuestion={listTypeQuestion} update={true} />
                        ) : (
                          <QuestionOneAnswer question={item} typeQuestion={listTypeQuestion} update={true} />
                        )}
                      </Modal>
                    </TableCell>
                    <TableCell width="130px" align="center">
                      {item?.point}
                    </TableCell>
                    <TableCell align="center" width="170px">
                      {item?.type_question?.type}
                    </TableCell>
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
                        content={`Xóa câu hỏi: ${item.question_text}`}
                        onInput={() => deleteQuestion(item.uid)}
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

export default Question;
