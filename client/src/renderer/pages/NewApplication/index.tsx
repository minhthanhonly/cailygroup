import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { axiosPrivate } from "../../api/axios";
import { Heading2 } from "../../components/Heading";

export default function NewApplication(){
  type FieldNewApplication = {
    id: number,
    form_name: string,
  };
  const [listNewApplication, setListNewApplication] = useState<FieldNewApplication[] | []>([]);

  const fetchNewApplication = async () => {
    const res = await axiosPrivate.get("newapplication/");
    setListNewApplication(res.data);
  };
  useEffect(() => {
    fetchNewApplication();
  },[])

  return (
    <>
      <Heading2 text="申請書一覧" />
      <table className="table-base">
        <tbody>
          {listNewApplication.map((value, index) => (
            <tr key={index}>
              <th><NavLink to={"detail/" + value.id} className="link">{value.form_name}</NavLink></th>
              <td>NewApplication</td>
            </tr>
          ))}
        </tbody>
    </table>
    </>
  )
}
