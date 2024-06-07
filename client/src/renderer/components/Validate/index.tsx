import { toast } from "react-toastify";

export const ERROR: { [key: string]: any } = {
  require: "Vui lòng nhập ",
  choose: "Vui lòng chọn ",
  illegal: "Giá trị nhập vào không hợp lệ",
  indispensable: "Tên nhóm là bắt buộc",
  obligatory: "Tên ngày lễ là bắt buộc"
};

export const ERROR_JP: { [key: string]: any } = {
  require: "を正しく入力してください。",
  choose: "を選択してください。",
  illegal: "不正な値が入力されています。",
  emty: "入力情報が不足しています。",
};

function validateEmail(email: string) {
  email = (email == null) ? "" : email;
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function isZenSpace(str: string) {
  str = (str == null) ? "" : str;
  if (str.match(/^\s+/)) {
    return true;
  } else {
    return false;
  }
}

function isNumber(int) {
  int = (int == null) ? "" : int;
  if (int.match(/^[0-9]+$/)) {
    return true;
  } else {
    return false;
  }
}

const useridName = "ID User";
const passwordName = "Mật khẩu";
const passwordConfirmName = "Mật khẩu (Xác nhận)";
const realnameName = "Họ và tên";
const userEmail = "Email";
const userGroupName = "Nhóm";
const authorityName = "Quyền truy cập";

type paraUser = {
  olduserid: string,
  userid: string,
  password: string,
  password_confirm: string,
  passwordNew: string,
  realname: string,
  user_email: string,
  authority: string,
  user_group: string,
}

export const isValidUser = ({ ...paraUser }, olduserid: string) => {
  if (!paraUser.userid) {
    toast.error(ERROR['require'] + useridName);
    return false;
  } else if (isZenSpace(paraUser.userid)) {
    toast.error("Giá trị nhập vào " + useridName + " không hợp lệ.");
    return false;
  }

  if (olduserid) {
    toast.error(useridName + " đã tồn tại!");
    return false;
  }

  if (!paraUser.userid) {
    toast.error(ERROR['require'] + useridName);
    return false;
  } else if (isZenSpace(paraUser.userid)) {
    toast.error("Giá trị nhập vào " + useridName + " không hợp lệ.");
    return false;
  }

  if (!paraUser.password) {
    toast.error(ERROR['require'] + passwordName);
    return false;
  } else if (isZenSpace(paraUser.password)) {
    toast.error("Giá trị nhập vào " + passwordName + " không hợp lệ.");
    return false;
  }

  if (paraUser.password_confirm != paraUser.password) {
    toast.error(passwordConfirmName + " không khớp.");
    return false;
  }

  if (!paraUser.realname) {
    toast.error(ERROR['require'] + realnameName);
    return false;
  }

  if (!paraUser.user_email) {
    toast.error(ERROR['require'] + userEmail);
    return false;
  }

  if (!validateEmail(paraUser.user_email)) {
    toast.error(userEmail + " nhập vào không hợp lệ.");
    return false;
  }

  if (!paraUser.user_group || paraUser.user_group == '-1') {
    toast.error(ERROR['choose'] + userGroupName);
    return false;
  }

  if (!paraUser.authority || paraUser.authority == '-1') {
    toast.error(ERROR['choose'] + authorityName);
    return false;
  }

  return true;
}

/* ============================= User Edit ==============================* */
type selectedValue = {
  authority: string,
  user_group: string,
}
export const isValidUserEdit = ({ ...paraUser }, { ...selectedValue }, password: string, password_confirm: string) => {
  if (!paraUser.user_email) {
    toast.error(ERROR['require'] + userEmail);
    return false;
  }

  if (!validateEmail(paraUser.user_email)) {
    toast.error(userEmail + " nhập vào không hợp lệ.");
    return false;
  }

  if (isZenSpace(password)) {
    toast.error("Giá trị nhập vào " + passwordName + " không hợp lệ.");
    return false;
  }

  if (password != password_confirm) {
    toast.error(passwordConfirmName + " không khớp.");
    return false;
  }

  if (!paraUser.realname) {
    toast.error(ERROR['require'] + realnameName);
    return false;
  }

  if (!selectedValue.user_group || selectedValue.user_group == '-1') {
    toast.error(ERROR['choose'] + userGroupName);
    return false;
  }

  if (selectedValue.authority) {
    if (!selectedValue.authority || selectedValue.authority == '-1') {
      toast.error(ERROR['choose'] + authorityName);
      return false;
    }
  }

  return true;
}

/* =======================================================================* */

const groupName = "Tên nhóm";
type paraGroup = {
  group_name: string;
}

export const isValidGroupEdit = ({ ...paraGroup }) => {
  if (!paraGroup.group_name) {
    toast.error(ERROR['indispensable']);
    return false;
  }
  return true;
}

export const isValidGroup = ({ ...paraGroup }) => {
  if (!paraGroup.group_name) {
    toast.error(ERROR['require'] + groupName + "!");
    return false;
  }
  return true;
}

/* =======================================================================* */

const names = "tên ngày lễ";
type paraTimecardsholidays = {
  name: string;
  names: string;
}

export const isValidTimecardsholidaysEdit = ({ ...paraTimecardsholidays }) => {
  if (!paraTimecardsholidays.name) {
    toast.error(ERROR['obligatory']);
    return false;
  }
  return true;
}

export const isValidTimecardsholidays = ({ ...paraTimecardsholidays }) => {
  if (!paraTimecardsholidays.names) {
    toast.error(ERROR['require'] + names + "!");
    return false;
  }
  return true;
}

/* =======================================================================* */

const FormName = "Tên Form";
const FieldName = "các thuộc tính của Form";
type paraForm = {
  form_name: string;
}

export const isValidForm = ({ ...paraForm }, reactFormData: any) => {
  if (!paraForm.form_name) {
    toast.error(ERROR['require'] + FormName + "!");
    return false;
  }

  if (reactFormData.length === 0) {
    toast.error(ERROR['require'] + FieldName + "!");
    return false;
  }
  return true;
}

/* =======================================================================* */

export const isValidText = (Value: string, Label: string) => {
  if (!Value) {
    toast.error(Label + ERROR_JP['require']);
    return false;
  }
  return true;
}

export const isValidChooseDate = (Value: string) => {
  if (!Value) {
    toast.error("日付を選択してください");
    return false;
  }
  return true;
}

export const isValidNumber = (Value: any, Label: string) => {
  if (!isNumber(Value)) {
    toast.error(Label + " - " + ERROR_JP['illegal']);
    return false;
  }
  if (Value <= 0) {
    toast.error(Label + " - " + ERROR_JP['illegal']);
    return false;
  }
  return true;
}

export const isValidCheck = ( ckecked: boolean, Label: string ) => {
  if(!ckecked) {
    toast.error(Label + ERROR_JP['choose']);
    return false;
  }
  return true;
}

export const isValidTextArea = (Value: string, Label: string) => {
  if (!Value) {
    toast.error(Label + ERROR_JP['require']);
    return false;
  }
  return true;
}

export const isValidTime = (Value: string, Label: string) => {
  const regex = /^([01]\d|2[0-3]):([0-5]\d)$/;
  if (regex.test(Value)!=true) {
    toast.error(Label + " - " + ERROR_JP['illegal']);
    return false;
  }
  return true;
}

export const isValidtextTable = (Value: string, Label: string) => {
  if (!Value) {
    toast.error(Label + ERROR_JP['emty']);
    return false;
  }
  return true;
}

export const isValidTextJapan = (Value: string) => {
  if (!Value) {
    toast.error("Tên file không được chứa ký tự tiếng Nhật.");
    return false;
  }
  return true;
}
