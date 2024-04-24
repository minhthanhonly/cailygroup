import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosPrivate } from "../../api/axios";
import F_Text from "../Form/Field/F_Text";

export default function NewApplicationDetail(){
  const { id } = useParams();
  const [formData, setFormData] = useState<any>([]);

  const fetchNewApplicationById = async () => {
    try {
      const res = await axiosPrivate.get("newapplication/detail/" + id);
      const data = res.data;
      const parsedFormJson = JSON.parse(data[0].form);
      const field = [
        ...parsedFormJson.reactFormData, // Giữ nguyên các trường từ dữ liệu cũ
      ];
      setFormData(field);
      console.log(field);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  useEffect(() => {
    fetchNewApplicationById();
  },[])

  let formHTML: any = "";
  return (
    <>
      <h1>NewApplicationDetail</h1>
      {
        formData.map((item, index) => {
          switch(item.key){
            case 'F_Text':
              return <F_Text/>;
            // case 'F_InputText':
            //   return <F_InputText/>;
            // case 'F_Checkbox':
            //   return <F_Checkbox/>;
            // case 'F_TextArea':
            //   return <F_TextArea/>;
            default:
              formHTML+= "";
              break;
          }
        })
      }
    </>
  )
}
