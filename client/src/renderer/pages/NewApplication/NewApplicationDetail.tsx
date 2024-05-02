import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { axiosPrivate } from "../../api/axios";
import ComponentInputText from "../Form/Component/ComponentInputText";
import ComponentText from "../Form/Component/ComponentText";
import C_TravelExpenses from "../Estimate/Components/C_TravelExpenses";
import ComponentDatePicker from "../Form/Component/ComponentDatePicker";
import ComponentTextArea from "../Form/Component/ComponentTextArea";
import { Heading2 } from "../../components/Heading";
import { ButtonBack } from "../../components/Button/ButtonBack";
import ComponentCheckbox from "../Form/Component/ComponentCheckbox";

export default function NewApplicationDetail(){
  const { id } = useParams();
  const [formName, setFormName] = useState('');
  const [formData, setFormData] = useState<any>([]);
  const navigate = useNavigate();

  const fetchNewApplicationById = async () => {
    try {
      const res = await axiosPrivate.get("newapplication/detail/" + id);
      const data = res.data;
      const parsedFormJson = JSON.parse(data[0].form);
      const field = [
        ...parsedFormJson.reactFormData, // Giữ nguyên các trường từ dữ liệu cũ
      ];
      setFormData(field);
      setFormName(data[0].form_name);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };
0
  useEffect(() => {
    fetchNewApplicationById();
  },[])

  const handleBackIndex = () => {
    navigate('/newapplication');
  }

  let formHTML: any = "";

  const [formValue, setFormValue] = useState({});
  const [dateValue, setDateValue] = useState({});
  const [message, setMessage] = useState('');

  // Receive data from children
  const callbackFunction = (label, childData) => {
    setFormValue({ ...formValue, [label]: childData})
  }

  // console.log(formValue);

  const callbackFunctionDate = (label, childData) => {
    setDateValue({ ...dateValue, [label]: childData})
  }

  console.log(dateValue);



  return (
    <>
      <Heading2 text={formName} />
      {/* <p> {formValue.tablejson} </p> */}
      <div className="c-row"><p className="txt-lead">下記の通り申請致します。 </p></div>
      {
        formData.map((item, index) => {
          switch(item.key){
            case 'F_Text':
              return <div className="c-row" key={index}><ComponentText text={item.content}/></div>;
            case 'F_InputText':
              return(
                <div className="c-row" key={index}>
                  <ComponentInputText
                    name={item.id}
                    label={item.label}
                    required={item.required}
                    parentCallback={callbackFunction}
                  />
                </div>
              )
            case 'F_DatePicker':
              return (
                <div className="c-row" key={index}>
                  <ComponentDatePicker
                    label={item.label}
                    required={item.required}
                    customOptions={item.custom_options}
                    days={item.props[0].days}
                    times={item.props[0].times}
                    timesto={item.props[0].timesto}
                    parentCallback={callbackFunctionDate}
                  />
                </div>
              )
            case 'F_TextArea':
              return (
                <div className="c-row" key={index}>
                  <ComponentTextArea
                    label={item.label}
                    required={item.required}
                    parentCallback={callbackFunction}
                  />
                </div>
              )
            case 'F_Checkbox':
              return <div className="c-row" key={index}><ComponentCheckbox label={item.label} required={item.required} customOptions={item.custom_options}/></div>
            default:
              formHTML+= "";
              break;
          }
        })
      }
      <div className="box-router">
        <div className="box-router__title">承認ルート</div>
          <div className="grid-row box-router__grid">
            <div className="box-router__name">
              <p>承認者: </p> <p>齋藤社長</p>
            </div>
            <div className="box-router__name">
              <p>共有者: </p> <p>総務</p>
            </div>
          </div>
          <div className="box-router__edit">
            <p className="plus-row">承認ルートを編集</p>
          </div>
      </div>
      <div className="wrp-button mt50">
        <button className="btn btn--from btn--gray">下書き保存</button>
        <button className="btn btn--from btn--blue">申請する</button>
      </div>
      <ButtonBack onHandle={handleBackIndex}/>
    </>
  )
}
