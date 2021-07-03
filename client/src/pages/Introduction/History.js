import React from "react";
import { MainLayout } from "layouts";
import { LangConst } from "const";

const History = () => {
  return (
    <MainLayout name={LangConst.TXT_HISTORY_BLOOD}>
      <div className="para-history">
        {/* <embed
          src="https://drive.google.com/viewerng/viewer?embedded=true&url=http://localhost:5000/pdf/7599a8826243d142a32b904ee8797e81.pdf"
          width="800"
          height="500"
        /> */}
        <iframe
          title="lịch sử Hội"
          src="https://drive.google.com/file/d/1e2F-WFTIr2zpTfX2ndaKjHbzraHCuSGv/preview"
          style={{ width: "100%", height: "700px" }}
          frameBorder="0"
        ></iframe>
        {/* <iframe src="https://drive.google.com/file/d/1e2F-WFTIr2zpTfX2ndaKjHbzraHCuSGv/preview" width="640" height="480"></iframe> */}
        {/* <iframe
          title="lịch sử Hội"
          src="http://localhost:5000/pdf/8999ade774aeaad8542fe688e381f8ea.pdf"
          style={{ width: "100%", height: "700px" }}
        /> */}
      </div>
    </MainLayout>
  );
};

export default History;
