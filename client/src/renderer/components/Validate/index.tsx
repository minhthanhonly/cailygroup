import { toast } from "react-toastify";

type isValidInputsProps = {
  userid: string,
  password: string,
}

const isValidInputs = (userid?: string, password?: string) => {
  if(!userid) {
    toast.error("Vui lòng nhập ID User!");
    return false;
  }
  if(!password) {
    toast.error("Vui lòng nhập Password!");
    return false;
  }
  return true;
}

export default isValidInputs;
