import { toast } from "react-toastify";

const ERROR: {[key: string]: any} = {
  require: "Vui lòng nhập ",
  choose: "Vui lòng chọn ",
  illegal: "Giá trị nhập vào không hợp lệ"
};

function validateEmail(email: string) {
  email = (email==null)? "":email;
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function isZenSpace(str: string){
  str = (str==null)? "":str;
  if(str.match(/^\s+/)){
    return true;
  }else{
    return false;
  }
}

type paraUser = {
  userid: string,
  password: string,
  // realname: string,
  // authority: string,
  // user_group: string,
}

export const isValidUser = ({...paraUser}) => {
  const useridName = "ID User";
  if(!paraUser.userid) {
    toast.error(ERROR['require'] + useridName + "!");
    return false;
  } else if(isZenSpace(paraUser.userid)) {
    toast.error("Giá trị nhập vào "+ useridName +" không hợp lệ");
    return false;
  }
  if(!paraUser.password) {
    toast.error("Vui lòng nhập Password!");
    return false;
  }
  // if(!paraUser.realname) {
  //   toast.error("Vui lòng nhập realname!");
  //   return false;
  // }
  // if(!paraUser.authority) {
  //   toast.error("Vui lòng nhập authority!");
  //   return false;
  // }
  // if(!paraUser.user_group) {
  //   toast.error("Vui lòng nhập user_group!");
  //   return false;
  // }
  return true;
}


