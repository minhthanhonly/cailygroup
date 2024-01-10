import { useContext } from "react";
import { TimeContext } from "../context/TimeProvider";

const useTime = () => {
  return useContext(TimeContext);
}

export default useTime;
