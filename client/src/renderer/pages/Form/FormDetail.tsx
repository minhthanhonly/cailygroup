import { useParams } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useEffect, useState } from "react";
import F_Text from "./Field/F_Text";
import F_InputText from "./Field/F_InputText";
import F_Checkbox from "./Field/F_Checkbox";
import F_TextArea from "./Field/F_TextArea";

export default function FormDetail(){
  const axiosPrivate = useAxiosPrivate();
  const {id} = useParams();
  const [formData, setFormData] = useState<any>([]);

  useEffect(() => {
    const getForm = async () => {
      try {
        const response = await axiosPrivate.get('form/detail/'+id);
        const data = response.data;
        const parsedFormJson = JSON.parse(data[0].form);
        const field = [
          ...parsedFormJson.reactFormData, // Giữ nguyên các trường từ dữ liệu cũ
        ];
        setFormData(field);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };
    getForm();
  },[])

  let formHTML: any = "";
  return (
    <>
      <h1>Form Demo</h1>
      {
        formData.map((item, index) => {
          switch(item.key){
            case 'F_Text':
              return <F_Text text={item.props.text}/>;
            case 'F_InputText':
              return <F_InputText/>;
            case 'F_Checkbox':
              return <F_Checkbox/>;
            case 'F_TextArea':
              return <F_TextArea/>;
            default:
              formHTML+= "";
              break;
          }
        })
      }
    </>
  )
}
