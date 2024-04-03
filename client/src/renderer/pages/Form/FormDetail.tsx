import { useParams } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useEffect, useState } from "react";
import { ReactFormBuilder } from "react-form-builder2";

export default function FormDetail(){
  const axiosPrivate = useAxiosPrivate();
  const {id} = useParams();
  const [formValue, setFormValue] = useState({ form_name: '', status: 'publish', owner: 'Admin'})
  const [reactFormData, setReactFormData] = useState<any>([]);
  useEffect(() => {
    axiosPrivate.get('form/detail/'+id).then(response => {
      setReactFormData(response.data);
      console.log(response.data);
    })
  }, [])
  return (
    <>
      <h1>Form Demo</h1>
      <ReactFormBuilder
        answer_data={reactFormData}
        onChange={setReactFormData}
      />
    </>
  )
}
