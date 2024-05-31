import { useParams } from "react-router-dom";
import { axiosPrivate } from "../../api/axios";
import { useEffect, useRef, useState } from "react";
import ComponentInputText from "../Form/Component/ComponentInputText";
import ComponentText from "../Form/Component/ComponentText";
import ComponentDatePicker from "../Form/Component/ComponentDatePicker";
import ComponentTextArea from "../Form/Component/ComponentTextArea";
import ComponentCheckbox from "../Form/Component/ComponentCheckbox";
import TravelExpenses from "../Estimate/TravelExpenses";
import ExpenseReport from "../Estimate/ExpenseReport";
import PriceBusinessReport from "../Estimate/PriceBusinessReport";
import TravelAllowance from "../Estimate/TravelAllowance";
import ComponentCheckboxAndTitle from "../Form/Component/ComponentCheckboxAndTitle";
import ComponentCheckboxAndInputText from "../Form/Component/ComponentCheckboxAndInputText";
import ComponentInputFile from "../Form/Component/ComponentInputFile";
import ComponentCheckboxAndDate from "../Form/Component/ComponentCheckboxAndDate";
import ComponentTextAndLabel from "../Form/Component/ComponentTextAndLabel";
import ComponentRadioButtons from "../Form/Component/ComponentRadioButtons";


export default function NewApplicationDetailEdit(){
  const {id} = useParams();
  const [appName, setAppName] = useState();
  const [appId, setAppId] = useState('');
  const [formData, setFormData] = useState<any>([]);

  const childRef = useRef(null);
  const childRefOfCheckbox = useRef(null);
  const childRefOfInputText = useRef(null);

  const fetchApplicationById = async () => {
    const res = await axiosPrivate.get("application/edit/" + id);
    const data = res.data;
    const parsedDataJson = JSON.parse(data.datajson);
    setAppName(parsedDataJson.appName)
    setAppId(parsedDataJson.appId);
  }

  const fetchApplicationDetailById = async () => {
    try {
      const getAppDetail = await axiosPrivate.get("newapplication/detail/" + appId);
      const data = getAppDetail.data;
      const parsedFormJson = JSON.parse(data[0].form);
      // const field = [
      //   ...parsedFormJson.reactFormData, // Giữ nguyên các trường từ dữ liệu cũ
      // ];
      // setFormData(field)
      console.log(parsedFormJson);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  }

  useEffect(()=>{
    fetchApplicationById();
    fetchApplicationDetailById();
  },[])

  // useEffect(()=>{
  //   fetchApplicationDetailById();
  // },[])

  // Lấy giá trị label của thành phần trong Form
  const [label, setLabel] = useState('');
  const callBackFunction = (childData) => {
    setLabel(childData);
  }

  // Lấy giá trị của thành phần trong Table
  const [estimate, setEstimate] = useState('');
  const callBackFunction2 = (childData) => {
    setEstimate(childData)
  }

  // Lấy giá trị của File Upload
  const [pfile, setPfile] = useState('');
  const fileCallBackFunction = (childData) => {
    setPfile(childData);
  }

  // Lấy giá trị của File Upload khi Remove File
  const fileClearCallBackFunction = (childData) => {
    setPfile(childData);
  }

  // Gọi ra các thành phần của FORM
  const componentMap: { [key: string]: React.FC<{ id: string, label: string, text?: string, required: boolean, value?: any, customProps?: any, customOptions?: any, days?: boolean, times?: boolean, timesto?: boolean, parentCallback?: any, ref?: any, parentFileCallback?: any, parentClearFileCallback?: any}> } = {
    'F_Text': ComponentText,
    'F_TextAndLabel': ComponentTextAndLabel,
    'F_InputText': ComponentInputText,
    'F_TextArea': ComponentTextArea,
    'F_DatePicker': ComponentDatePicker,
    'F_RadioButtons': ComponentRadioButtons,
    'F_TitleAndCheckbox': ComponentCheckboxAndTitle,
    'F_Checkbox': ComponentCheckbox,
    'F_CheckboxAndInputText': ComponentCheckboxAndInputText,
    'F_CheckboxAndDate': ComponentCheckboxAndDate,
    'F_InputFile': ComponentInputFile,
    // Thêm các ánh xạ khác nếu cần
  };

  // Render các thành phần có trong FORM
  const renderedComponents = formData.map((item, index) => {
    const Component = componentMap[item.key]
    if (Component) {
      let valRel: any = null;
      (item.key === 'F_InputText') ? valRel = childRefOfInputText :
      (item.key === 'F_DatePicker') ? valRel = childRef :
      (item.key === 'F_TitleAndCheckbox' || item.key === 'F_Checkbox' || item.key === 'F_CheckboxAndInputText') ? valRel = childRefOfCheckbox : valRel;
      return (
        <div className="c-row" key={index}>
          {(item.key === 'F_DatePicker') ?
            <Component
              id={item.id}
              label={item.label}
              required={item.required}
              customOptions={item.custom_options}
              days={item.props[0].days}
              times={item.props[0].times}
              timesto={item.props[0].timesto}
              parentCallback={callBackFunction}
              ref={valRel}
            /> : (item.key === 'F_InputFile') ?
            <Component
              id={item.id}
              label={item.label}
              required={item.required}
              value={item.value}
              parentFileCallback={fileCallBackFunction}
              parentClearFileCallback={fileClearCallBackFunction}
            /> : (item.key === 'F_TextAndLabel') ?
            <Component
              id={item.id}
              label={item.label}
              text={item.props[0].text}
              required={item.required}
            /> :
            <Component
              id={item.id}
              label={item.label}
              text={item.content}
              required={item.required}
              customProps={item.props}
              customOptions={item.custom_options}
              ref={valRel}
            />
          }
        </div>
      );
    }
    return null;
  });

  return (
    <>
      {renderedComponents}
    </>
  )
}
