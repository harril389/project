// import React, { useContext, useEffect, useState } from "react";
// import InformationUser from "./Components/informationUser";
// import SpecificInformation from "./Components/specificInformation";
// import LearnAndActivities from "./Components/learningActivity";
// import HomepageContext from "../../../context/HomepageContext";
// import { Select, Form, notification, Input, Button } from "antd";
// import { Profile } from "../../../api/base";
// import "./style.scss";

// const MemberProfile = (props) => {
//   const { getFieldDecorator } = props.form;
//   const { setNameMap, setLoading } = useContext(HomepageContext);
//   const [user, setUser] = useState([]);
//   const [file, setFile] = useState({});
//   const fetchData = async () => {
//     setLoading(true);
//     const result = await Profile.getUserProfile();
//     setLoading(false);
//     if (result) {
//       if (result.success) {
//         setUser(result.data.data);
//       }
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     props.form.validateFields(async (err, values) => {
//       if (!err) {
//         setLoading(true);
//         await Profile.uploadAvatar(file);
//         const { success } = await Profile.updateUserProfile(values);
//         setLoading(false);
//         if (success) {
//           notification["success"]({
//             message: "Cập nhật thông tin thành công!",
//           });
//         } else {
//           notification["error"]({
//             message: "Cập nhật thông tin thất bại!",
//           });
//         }
//       }
//     });
//   };

//   useEffect(() => {
//     fetchData();
//     setNameMap({
//       "/": "Trang chủ",
//       "/ho-so-ca-nhan": "Hồ sơ cá nhân",
//     });
//   }, []);

//   //nhóm máu
//   const { Option } = Select;
//   return (
//     <div className="box-para-member">
//       <div className="box-body-member">
//         <Form onSubmit={handleSubmit} className="row">
//           <div className="box-profile-1">
//             <InformationUser
//               image={user.Image}
//               file={file}
//               setFile={setFile}
//               sttv={user.Sothethanhvien}
//               hovaten={user.Hovaten}
//               ngaysinh={user.Ngaysinh}
//               gioitinh={user.Gioitinh}
//               image={user.Image}
//               giotmau={user.specialized}
//               SolanHM={user.SolanHM}
//               Nhommau={user.Nhommau}
//               rhD={user.Rh}
//               donvi={user.Donvi}
//               donvicuthe={user.Donvicuthe}
//               doanviendangvien={user.DoanvienDangvien}
//               trinhdohocvan={user.Trinhdohocvan}
//               email={user.Email}
//               sdt={user.Dienthoai}
//               cmtorhc={user.CMTorHC}
//               linkfb={user.Facebook}
//               diachi={user.DiachiLL}
//             />
//           </div>
//           <div className="box-profile-2">
//             <SpecificInformation
//               donvi={user.Donvi}
//               donvicuthe={user.Donvicuthe}
//               doanviendangvien={user.DoanvienDangvien}
//               trinhdohocvan={user.Trinhdohocvan}
//               quequan={user.Quequan}
//               thongtinlienheGD={user.ThongtinlienheGD}
//               ghichu={user.Ghichukhac}
//             />
//             <LearnAndActivities />
//             <Form.Item
//               action=""
//               method="post"
//               className="information"
//               style={{ marginBottom: 0 }}
//             >
//               <div>
//                 {/* <div id="thong-tin-co-ban" className="title-profile-s">
//                   Thông tin cơ bản
//                 </div> */}
//                 <div className="body-border-profile-s">
//                   {/* <div> */}
//                   <div className="border-bottom-profile-s">
//                     <label className="label-profile-s">CMND/CCCD/HC: </label>
//                     {getFieldDecorator("cmtorhc", {
//                       initialValue: user.CMTorHC,
//                     })(
//                       <Input
//                         type="text"
//                         title={user.CMTorHC}
//                         className=" input-profile-s-1"
//                       />
//                     )}
//                   </div>
//                   <div className="border-bottom-profile-s">
//                     <label className="label-profile-s">Ngày cấp: </label>
//                     {getFieldDecorator("ngaycap", {
//                       initialValue: user.Ngaycap,
//                     })(
//                       <Input
//                         type="date"
//                         title={user.Ngaycap}
//                         className=" input-profile-s-1"
//                       />
//                     )}
//                   </div>
//                   <div className="border-bottom-profile-s">
//                     <label className="label-profile-s">Nơi cấp: </label>
//                     {getFieldDecorator("noicap", {
//                       initialValue: user.Noicap,
//                     })(
//                       <Input
//                         type="text"
//                         title={user.Noicap}
//                         className=" input-profile-s-1"
//                       />
//                     )}
//                   </div>
//                   <div className="border-bottom-profile-s">
//                     <label className="label-profile-s">Điện thoại: </label>
//                     {getFieldDecorator("dienthoai", {
//                       initialValue: user.Dienthoai,
//                     })(
//                       <Input
//                         type="text"
//                         title={user.Dienthoai}
//                         className=" input-profile-s-1"
//                       />
//                     )}
//                   </div>
//                   <div className="border-bottom-profile-s">
//                     <label className="label-profile-s">Link Facebook: </label>
//                     {getFieldDecorator("facebook", {
//                       initialValue: user.Facebook,
//                     })(
//                       <Input
//                         type="text"
//                         title={user.Facebook}
//                         className=" input-profile-s-1"
//                       />
//                     )}
//                   </div>
//                   <div className="border-bottom-profile-s">
//                     <label className="label-profile-s">Địa chỉ Email: </label>
//                     {getFieldDecorator("email", {
//                       initialValue: user.Email,
//                     })(
//                       <Input
//                         type="text"
//                         title={user.Email}
//                         className=" input-profile-s-1"
//                         required
//                       />
//                     )}
//                   </div>
//                   <div className="border-bottom-profile-s">
//                     <label className="label-profile-s">Quê quán: </label>
//                     {getFieldDecorator("quequan", {
//                       initialValue: user.Quequan,
//                     })(
//                       <Input
//                         type="text"
//                         title={user.Quequan}
//                         className=" input-profile-s-1"
//                       />
//                     )}
//                   </div>
//                   <div className="border-bottom-profile-s">
//                     <label className="label-profile-s">Nơi ở hiện nay: </label>
//                     {getFieldDecorator("diachill", {
//                       initialValue: user.DiachiLL,
//                     })(
//                       <Input
//                         type="text"
//                         title={user.DiachiLL}
//                         className=" input-profile-s-1"
//                       />
//                     )}
//                   </div>
//                   <div className="border-bottom-profile-s">
//                     <label className="label-profile-s">Địa chỉ liên hệ: </label>
//                     {getFieldDecorator("thongtinlienhegd", {
//                       initialValue: user.ThongtinlienheGD,
//                     })(
//                       <Input
//                         type="text"
//                         title={user.ThongtinlienheGD}
//                         className=" input-profile-s-1"
//                       />
//                     )}
//                   </div>
//                   <div className="border-bottom-profile-s">
//                     <label className="label-profile-s">Ghi chú: </label>
//                     {getFieldDecorator("ghichukhac", {
//                       initialValue: user.Ghichukhac,
//                     })(
//                       <Input
//                         type="text"
//                         title={user.Ghichukhac}
//                         className=" input-profile-s-1"
//                       />
//                     )}
//                   </div>
//                   {/* </div> */}
//                 </div>
//               </div>
//             </Form.Item>
//             <Form.Item
//               action=""
//               method="post"
//               className="information"
//               style={{ marginBottom: 0 }}
//             >
//               <div>
//                 {/* <div id="hien-mau" className="title-profile-s">
//                   Hiến máu
//                 </div> */}
//                 {/* <div className="body-border-profile-s">
//                   <div className="border-bottom-profile-s">
//                     <label className="label-profile-s">Số lần hiến máu: </label>
//                     {getFieldDecorator("solanhm", {
//                       initialValue: user.SolanHM,
//                     })(
//                       <Input
//                         type="text"
//                         title={user.SolanHM}
//                         className=" input-profile-s-1"
//                       />
//                     )}
//                   </div>
//                   <div className="border-bottom-profile-s">
//                     <label className="label-profile-s">Nhóm máu: </label>
//                     {getFieldDecorator("nhommau", {
//                       initialValue: user.Nhommau ? user.Nhommau : null,
//                     })(
//                       <Select
//                         style={{
//                           marginLeft: 5,
//                           height: 30,
//                           width: 120,
//                           marginTop: 5,
//                         }}
//                       >
//                         <Option style={{ textAlign: "center" }} value="O">
//                           O
//                         </Option>
//                         <Option style={{ textAlign: "center" }} value="A">
//                           A
//                         </Option>
//                         <Option style={{ textAlign: "center" }} value="B">
//                           B
//                         </Option>
//                         <Option style={{ textAlign: "center" }} value="AB">
//                           AB
//                         </Option>
//                       </Select>
//                     )}
//                   </div>
//                   <div className="border-bottom-profile-s">
//                     <label className="label-profile-s">Rh(D): </label>
//                     {getFieldDecorator("rh", {
//                       initialValue: user.Rh ? user.Rh : null,
//                     })(
//                       <Select
//                         style={{
//                           marginLeft: 5,
//                           height: 30,
//                           width: 120,
//                           marginTop: 5,
//                         }}
//                       >
//                         <Option style={{ textAlign: "center" }} value={true}>
//                           +
//                         </Option>
//                         <Option style={{ textAlign: "center" }} value={false}>
//                           -
//                         </Option>
//                       </Select>
//                     )}
//                   </div>
//                 </div> */}
//               </div>
//             </Form.Item>
//             <Form.Item
//               action=""
//               method="post"
//               className="information"
//               style={{ marginBottom: 0 }}
//             >
//               <div>
//                 {/* <div id="don-vi-cong-tac" className="title-profile-s">
//                   Đơn vị công tác
//                 </div> */}
//                 {/* <div className="body-border-profile-s">
//                   <div className="border-bottom-profile-s">
//                     <label className="label-profile-s">
//                       Đơn vị học tập/Công tác:{" "}
//                     </label>
//                     {getFieldDecorator("donvi", {
//                       initialValue: user.Donvi,
//                     })(
//                       <Input
//                         type="text"
//                         title={user.Donvi}
//                         className=" input-profile-s-1"
//                       />
//                     )}
//                   </div>
//                   <div className="border-bottom-profile-s">
//                     <label className="label-profile-s">
//                       Khoa/Đơn vị cụ thể:{" "}
//                     </label>
//                     {getFieldDecorator("donvicuthe", {
//                       initialValue: user.Donvicuthe,
//                     })(
//                       <Input
//                         type="text"
//                         title={user.Donvicuthe}
//                         className=" input-profile-s-1"
//                       />
//                     )}
//                   </div>
//                   <div className="border-bottom-profile-s">
//                     <label className="label-profile-s">
//                       Đoàn viên/Đảng viên:{" "}
//                     </label>
//                     {getFieldDecorator("doanviendangvien", {
//                       initialValue: user.DoanvienDangvien,
//                     })(
//                       <Input
//                         type="text"
//                         title={user.DoanvienDangvien}
//                         className=" input-profile-s-1"
//                       />
//                     )}
//                   </div>
//                   <div className="border-bottom-profile-s">
//                     <label className="label-profile-s">
//                       Trình độ học vấn:{" "}
//                     </label>
//                     {getFieldDecorator("trinhdohocvan", {
//                       initialValue: user.Trinhdohocvan,
//                     })(
//                       <Input
//                         type="text"
//                         title={user.Trinhdohocvan}
//                         className=" input-profile-s-1"
//                       />
//                     )}
//                   </div>
//                 </div> */}
//               </div>
//               <div>
//                 {/* <div id="dia-chi" className="title-profile-s">
//                   Địa chỉ
//                 </div> */}
//                 {/* <div className="body-border-profile-s">
//                   <div className="border-bottom-profile-s">
//                     <label className="label-profile-s">Quê quán: </label>
//                     {getFieldDecorator("quequan", {
//                       initialValue: user.Quequan,
//                     })(
//                       <Input
//                         type="text"
//                         title={user.Quequan}
//                         className=" input-profile-s-1"
//                       />
//                     )}
//                   </div>
//                   <div className="border-bottom-profile-s">
//                     <label className="label-profile-s">Nơi ở hiện nay: </label>
//                     {getFieldDecorator("diachill", {
//                       initialValue: user.DiachiLL,
//                     })(
//                       <Input
//                         type="text"
//                         title={user.DiachiLL}
//                         className=" input-profile-s-1"
//                       />
//                     )}
//                   </div>
//                 </div> */}
//               </div>
//               <div>
//                 {/* <div id="lien-he-nguoi-than" className="title-profile-s">
//                   Liên hệ người thân
//                 </div> */}
//                 {/* <div className="body-border-profile-s">
//                   <div className="border-bottom-profile-s">
//                     <label className="label-profile-s">Địa chỉ liên hệ: </label>
//                     {getFieldDecorator("thongtinlienhegd", {
//                       initialValue: user.ThongtinlienheGD,
//                     })(
//                       <Input
//                         type="text"
//                         title={user.ThongtinlienheGD}
//                         className=" input-profile-s-1"
//                       />
//                     )}
//                   </div>
//                 </div> */}
//               </div>
//             </Form.Item>
//             <Form.Item
//               action=""
//               method="post"
//               className="information"
//               style={{ heigh: "auto" }}
//             >
//               <div>
//                 {/* <div id="ghi-chu-khac" className="title-profile-s">
//                   Ghi chú khác
//                 </div> */}
//                 {/* <div className="body-border-profile-s">
//                   <div className="border-bottom-profile-s">
//                     <label className="label-profile-s">Ghi chú: </label>
//                     {getFieldDecorator("ghichukhac", {
//                       initialValue: user.Ghichukhac,
//                     })(
//                       <Input
//                         type="text"
//                         title={user.Ghichukhac}
//                         className=" input-profile-s-1"
//                       />
//                     )}
//                   </div>
//                 </div> */}
//               </div>
//             </Form.Item>
//             <div className="DIVprofile">
//               <Form.Item>
//                 <Button
//                   className="buttonProfile"
//                   type="primary"
//                   htmlType="submit"
//                 >
//                   Lưu thay đổi
//                 </Button>
//               </Form.Item>
//             </div>
//           </div>
//         </Form>
//       </div>
//       {/* <div className="para-menu-profile-s">
//         <div className="body-menu-profile-s">
//           <div className="child-menu-profile-s">
//             <a href="#thong-tin-ca-nhan" className="tag-a-profile-s">
//               Thông tin cá nhân
//             </a>
//           </div>
//           <div className="child-menu-profile-s">
//             <a href="#thong-tin-co-ban" className="tag-a-profile-s">
//               Thông tin cơ bản
//             </a>
//           </div>
//           <div className="child-menu-profile-s">
//             <a href="#hien-mau" className="tag-a-profile-s">
//               Hiến máu
//             </a>
//           </div>
//           <div className="child-menu-profile-s">
//             <a href="#don-vi-cong-tac" className="tag-a-profile-s">
//               Đơn vị công tác
//             </a>
//           </div>
//           <div className="child-menu-profile-s">
//             <a href="#dia-chi" className="tag-a-profile-s">
//               Địa chỉ
//             </a>
//           </div>
//           <div className="child-menu-profile-s">
//             <a href="#lien-he-nguoi-than" className="tag-a-profile-s">
//               Liên hệ người thân
//             </a>
//           </div>
//           <div className="child-menu-profile-s">
//             <a href="#ghi-chu-khac" className="tag-a-profile-s">
//               Ghi chú khác
//             </a>
//             <br />
//           </div>
//         </div>
//       </div> */}
//     </div> // row
//   );
// };
// export default Form.create()(MemberProfile);
