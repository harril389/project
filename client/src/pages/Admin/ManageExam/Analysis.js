import React, { useState } from "react";
import Pagination from "rc-pagination";
import { Modal, Table, TableCell, TableRow, TableBody, Filter, Selected, Search, FormExam, Spinner } from "components";
import LayoutExam from "./layout";
import { AddSVG } from "theme/icons";
import { LangConst } from "const";
import { useLocation } from "react-router-dom";

const Analysis = props => {
  const [current, setCurrent] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const currentPath = useLocation().pathname;

  const onChangeCurrent = async page => {
    setCurrent(page);
  };

  return (
    <LayoutExam
      currentPath={currentPath}
      header={
        <Modal name={<AddSVG />} isIcon={true} title={LangConst.TXT_CREATE_EXAM}>
          <Spinner />
        </Modal>
      }
    >
      <div className="analysis"></div>
    </LayoutExam>
  );
};

export default Analysis;
