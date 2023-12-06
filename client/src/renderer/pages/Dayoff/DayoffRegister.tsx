import { Heading2 } from "../../components/Heading";
import { Button } from "../../components/Button";
import {
  FormLeave
} from '../../components/Form/Form';
import NavDayoff from "../../layouts/components/Nav/NavDayoff";
export const DayoffRegister = () => {
  return <>
    <NavDayoff role="admin"/>
    <FormLeave />
  </>;
};
