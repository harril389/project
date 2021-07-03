export const uuid = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
  // .replace(/-/g, "");
};

export const convertTime = time => {
  let date = new Date(time);
  let dateString = date.toLocaleDateString();
  let timeString = date.toLocaleTimeString();
  return `${timeString}-${dateString}`;
};

export const convertTimeUTC = time => {
  let date = new Date(time);
  let seconds = date.getUTCSeconds();
  let minutes = date.getUTCMinutes();
  let hours = date.getUTCHours();
  let dateString = date.toLocaleDateString();
  return `${hours}:${minutes}:${seconds}-${dateString}`;
};

export const convertTimeToISO = time => {
  let date = new Date(time);
  let convertTime = date.toISOString();
  let getTime = convertTime.split(":00.000Z");
  return getTime[0];
};

export const SplitString = data => {
  let getString = data.split("Chi hội Thanh niên vận động hiến máu");
  return getString[1];
};

export const convertTimeToMili = time => {
  let getTime = new Date(time).valueOf() / 1000;
  return getTime;
};

export const checkPath = (currentPath, itemPath) => {
  return currentPath === itemPath;
};

export const listBlood = [
  { uid: "bloodO", value: "O" },
  { uid: "bloodA", value: "A" },
  { uid: "bloodB", value: "B" },
  { uid: "bloodAB", value: "AB" },
];

export const listRh = [
  { uid: "rh+", value: true, name: "+" },
  { uid: "rh-", value: false, name: "-" },
];

export const listCity = [
  { uid: "hochmi", name: "Hồ Chí Minh" },
  { uid: "hano", name: "Hà Nội" },
  { uid: "dana", name: "Đà Nẵng" },
  { uid: "dona", name: "Đồng Nai" },
  { uid: "bidu", name: "Bình Dương" },
  { uid: "vuta", name: "Vũng Tàu" },
  { uid: "gila", name: "Gia Lai" },
  { uid: "khaho", name: "Khánh Hòa" },
  { uid: "lado", name: "Lâm Đồng" },
  { uid: "dala", name: "Đắk Lắk" },
  { uid: "loan", name: "Long An" },
  { uid: "tigia", name: "Tiền Giang" },
  { uid: "betre", name: "Bến Tre" },
  { uid: "travi", name: "Trà Vinh" },
  { uid: "vilo", name: "Vĩnh Long" },
  { uid: "dotha", name: "Đồng Tháp" },
  { uid: "angia", name: "An Giang" },
  { uid: "sotra", name: "Sóc Trăng" },
  { uid: "kigia", name: "Kiên Giang" },
  { uid: "catho", name: "Cần Thơ" },
  { uid: "viphu", name: "Vĩnh Phúc" },
  { uid: "hue", name: "Huế" },
  { uid: "hapho", name: "Hải Phòng" },
  { uid: "hadu", name: "Hải Dương" },
  { uid: "thabi", name: "Thái Bình" },
  { uid: "hagia", name: "Hà Giang" },
  { uid: "tuqua", name: "Tuyên Quang" },
  { uid: "phutho", name: "Phú Thọ" },
  { uid: "quani", name: "Quảng Ninh" },
  { uid: "nadi", name: "Nam Định" },
  { uid: "hana", name: "Hà Nam" },
  { uid: "nibi", name: "Ninh Bình" },
  { uid: "thaho", name: "Thanh Hóa" },
  { uid: "nghean", name: "Nghệ An" },
  { uid: "hati", name: "Hà Tĩnh" },
  { uid: "quabi", name: "Quảng Bình" },
  { uid: "quatri", name: "Quảng Trị" },
  { uid: "biphu", name: "Bình Phước" },
  { uid: "tani", name: "Tây Ninh" },
  { uid: "dano", name: "Đắk Nông" },
  { uid: "quanga", name: "Quảng Ngãi" },
  { uid: "quana", name: "Quảng Nam" },
  { uid: "thangu", name: "Thái Nguyên" },
  { uid: "baka", name: "Bắc Kạn" },
  { uid: "caba", name: "Cao Bằng" },
  { uid: "laso", name: "Lạng Sơn" },
  { uid: "bagia", name: "Bắc Giang" },
  { uid: "bani", name: "Bắc Ninh" },
  { uid: "haugia", name: "Hậu Giang" },
  { uid: "cama", name: "Cà Mau" },
  { uid: "bali", name: "Bạc Liêu" },
  { uid: "bithu", name: "Bình Thuận" },
  { uid: "kotu", name: "Kon Tum" },
  { uid: "phuye", name: "Phú Yên" },
  { uid: "nithu", name: "Ninh Thuận" },
  { uid: "bidi", name: "Bình Định" },
  { uid: "yeba", name: "Yên Bái" },
  { uid: "lacha", name: "Lai Châu" },
  { uid: "dibie", name: "Điện Biên" },
  { uid: "sola", name: "Sơn La" },
  { uid: "hobi", name: "Hòa Bình" },
  { uid: "huye", name: "Hưng Yên" },
  { uid: "laca", name: "Lào Cai" },
];
