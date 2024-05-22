import { SetStateAction, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { axiosPrivate, BASE_URL } from "../../api/axios";
import { isValidCheck, isValidNumber, isValidText, isValidTextArea, isValidtextTable } from "../../components/Validate/";
import { Heading2 } from "../../components/Heading";
import { ButtonBack } from "../../components/Button/ButtonBack";
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
import { emitter } from "../../layouts/components/Sidebar";

export default function NewApplicationDetail() {
  const { id } = useParams();
  const [formName, setFormName] = useState('');
  const [formData, setFormData] = useState<any>([]);
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');
  const users = JSON.parse(localStorage.getItem('users') || '{}');
  const [pfile, setPfile] = useState('');

  //
  const fileData = new FormData();

  //
  const childRef = useRef(null);
  const childRefOfCheckbox = useRef(null);
  const childRefOfInputText = useRef(null);

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
  }, [])

  const handleBackIndex = () => {
    navigate('/newapplication');
  }

  let formHTML: any = "";

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
  const fileCallBackFunction = (childData) => {
    setPfile(childData);
  }

  // Lấy giá trị của File Upload khi Remove File
  const fileClearCallBackFunction = (childData) => {
    setPfile(childData);
  }

  // Truy cập vào Form
  const formRef = useRef<HTMLFormElement>(null);

  // Truy cập vào Form có Table
  const formRefHaveTable = useRef<HTMLFormElement>(null);


  // Xử lý khi gửi Form Public
  const handleSubmit = async (e) => {
    e.preventDefault();
    const arrValid: any = [];

    // Bắt lỗi Validate
    let valid = true;
    let check: any = { childRef: childRef.current, childRefOfCheckbox: childRefOfCheckbox.current, childRefOfInputText: childRefOfInputText.current };
    for (var key in check) {
      if (check[key] !== null) {
        if (check[key].validate() == false) {
          valid = false;
        }
      }
    }
    //
    arrValid.push(valid);

    if (formRef.current) {
      const formElements = formRef.current.elements;
      const formData: string[] = [];
      let newObj: any = {};

      // Lấy tất cả các đối tượng trong Form
      for (let i = 0; i < formElements.length; i++) {
        const element = formElements[i] as HTMLInputElement;

        // Bắt lỗi Validate của Textarea
        if (element.required) {
          if (element.type === 'textarea') {
            let validTextAreaErrors = false;
            validTextAreaErrors = isValidTextArea(element.value, element.title);
            arrValid.push(validTextAreaErrors);
          }
        }

        // Lấy các thuộc tính của đối tượng
        if (element.value && element.type != 'checkbox') {
          if (element.ariaLabel === null) {
            newObj = {
              id: element.name,
              label: label,
              value: element.value,
            }
          } else if (element.ariaDescription) {
            newObj = {
              id: element.name,
              label: label,
              value: element.value + element.ariaLabel,
            }
          } else {
            newObj = {
              id: element.name,
              label: element.title,
              value: element.value,
            }
          }
          formData.push(newObj);
        }

        if (element.type === 'checkbox' && element.checked === true) {
          newObj = {
            id: element.name,
            label: element.title,
            value: element.value,
          }
          formData.push(newObj);
        }

        if (element.type === 'file' && element.value) {
          fileData.append('pfile', pfile);
          newObj = {
            id: element.name,
            label: element.title,
            value: BASE_URL + 'upload/' + pfile.name,
            type: 'file',
          }
          formData.push(newObj);
        }
      }

      // Gom các đối tượng cod id giống nhau vào một nhóm
      const groupedItems = formData.reduce((dataField, item) => {
        // Nếu chưa có nhóm cho id này thì tạo mảng mới
        if (!dataField[item.id]) {
          dataField[item.id] = { id: item.id, label: item.label };
        }

        // Duyệt qua các thuộc tính của đối tượng hiện tại
        Object.keys(item).forEach(key => {
          if (key !== 'id' && key !== 'label') { // bỏ qua thuộc tính id khi gộp
            if (!dataField[item.id][key]) {

              dataField[item.id][key] = [];
            }
            dataField[item.id][key].push(item[key]);
          }
        });

        return dataField;
      }, {})

      // Chuyển đổi từ đối tượng thành mảng các nhóm nếu cần
      const formDataIsGrouped = Object.values(groupedItems);

      // Tạo đối tượng JSON
      const appJSON: { [key: string]: any } = {
        appName: '',
        formData: [],
        tableData: [],
        id_status: 1,
        userNameReg: '',
        userEmailReg: '',
        user_id: 0,
      };
      appJSON.appName = formName;
      appJSON.formData = formDataIsGrouped;
      appJSON.userNameReg = users.realname;
      appJSON.userEmailReg = users.user_email;
      appJSON.user_id = users.id;

      const currentStatus = e.currentTarget.getAttribute('data-status');
      if (currentStatus === "draft") {
        appJSON.id_status = 5;
      }

      if (formRefHaveTable.current) {
        //Lấy giá trị của Table
        appJSON.tableData = estimate;

        //Bắt lỗi Validate các thành phần trong Table
        const formElementsInTable = formRefHaveTable.current.elements;

        // Lấy tất cả các đối tượng trong Form
        for (let i = 0; i < formElementsInTable.length; i++) {
          const element = formElementsInTable[i] as HTMLInputElement;

          if (element.value === "") {
            let validInputTextErrors = false;
            validInputTextErrors = isValidtextTable(element.value, element.title);
            arrValid.push(validInputTextErrors);
            return
          }
        }
      } else {
        appJSON.tableData = [];
      }

      // Chuyển đổi JSON thành chuỗi JSON
      const appJsonString = JSON.stringify(appJSON);

      if (pfile) {
        const resUpload = await axiosPrivate.post("newapplication/upload", fileData, {
          headers: { 'Content-Type': "multipart/form-data" },
        });
      }

      // Kiểm tra xem tất cả các phần tử trong mảng có true không
      const allTrueArrValid: boolean = arrValid.every(x => x === true);

      if (allTrueArrValid === true) {
        const res = await axiosPrivate.post("newapplication/add", appJsonString);
        if (res.data.success === 'error') {
          setError('Bị lỗi khi đăng ký');
        } else {
          setMsg('Bạn đã đăng ký thành công');
          emitter.emit('reloadSidebar');
          setTimeout(() => {
            navigate('/newapplication');
          }, 2000);
        }
      }
    }
  }

  return (
    <>
      <Heading2 text={formName} />
      {error == '' ? '' : <div className="box-bg --full mb20"><p className="bg bg-red">{error}</p></div>}
      {msg == '' ? '' : <div className="box-bg --full mb20"><p className="bg bg-green">{msg}</p></div>}
      <div className="c-row"><p className="txt-lead">下記の通り申請致します。 </p></div>
      <form ref={formRef}>
        {
          formData.map((item, index) => {
            switch (item.key) {
              case 'F_Text':
                return <div className="c-row" key={index}><ComponentText text={item.content} /></div>;
              case 'F_TextAndLabel':
                return (
                  <div className="c-row" key={index}>
                    <ComponentTextAndLabel
                      keys={item.key}
                      id={item.id}
                      label={item.label}
                      required={item.required}
                      text={item.props[0].text}
                    />
                  </div>
                )
              case 'F_InputText':
                return (
                  <div className="c-row" key={index}>
                    <ComponentInputText
                      keys={item.key}
                      id={item.id}
                      label={item.label}
                      required={item.required}
                      ref={childRefOfInputText}
                    />
                  </div>
                )
              case 'F_DatePicker':
                return (
                  <div className="c-row" key={index}>
                    <ComponentDatePicker
                      id={item.id}
                      label={item.label}
                      required={item.required}
                      customOptions={item.custom_options}
                      days={item.props[0].days}
                      times={item.props[0].times}
                      timesto={item.props[0].timesto}
                      parentCallback={callBackFunction}
                      ref={childRef}
                    />
                  </div>
                )
              case 'F_TextArea':
                return (
                  <div className="c-row" key={index}>
                    <ComponentTextArea
                      id={item.id}
                      label={item.label}
                      required={item.required}
                    />
                  </div>
                )
              case 'F_TitleAndCheckbox':
                return (
                  <div className="c-row" key={index}>
                    <ComponentCheckboxAndTitle
                      id={item.id}
                      label={item.label}
                      required={item.required}
                      customProps={item.props}
                      ref={childRefOfCheckbox}
                    />
                  </div>
                )
              case 'F_Checkbox':
                return (
                  <div className="c-row" key={index}>
                    <ComponentCheckbox
                      id={item.id}
                      label={item.label}
                      required={item.required}
                      customOptions={item.custom_options}
                      ref={childRefOfCheckbox}
                    />
                  </div>
                )
              case 'F_CheckboxAndInputText':
                return (
                  <div className="c-row" key={index}>
                    <ComponentCheckboxAndInputText
                      id={item.id}
                      label={item.label}
                      required={item.required}
                      customOptions={item.custom_options}
                      ref={childRefOfCheckbox}
                    />
                  </div>
                )
              case 'F_CheckboxAndDate':
                return (
                  <div className="c-row" key={index}>
                    <ComponentCheckboxAndDate
                      id={item.id}
                      label={item.label}
                      required={item.required}
                      customOptions={item.custom_options}
                    />
                  </div>
                )
              case 'F_InputFile':
                return (
                  <div className="c-row" key={index}>
                    <ComponentInputFile
                      id={item.id}
                      label={item.label}
                      required={item.required}
                      value={item.value}
                      parentFileCallback={fileCallBackFunction}
                      parentClearFileCallback={fileClearCallBackFunction}
                    />
                  </div>
                )
              default:
                formHTML += "";
                break;
            }
          })
        }
      </form>
      <form ref={formRefHaveTable}>
        {
          formData.map((item, index) => {
            switch (item.key) {
              case 'T_TableTravelExpenses':
                return (
                  <div className="c-row" key={index}>
                    <TravelExpenses id_table={undefined} parentCallback={callBackFunction2} />
                  </div>
                )
              case 'T_TableExpenseReport':
                return (
                  <div className="c-row" key={index}>
                    <ExpenseReport id_table={undefined} parentCallback={callBackFunction2} />
                  </div>
                )
              case 'T_TablePriceBusinessReport':
                return (
                  <div className="c-row" key={index}>
                    <PriceBusinessReport id_table={undefined} parentCallback={callBackFunction2} />
                  </div>
                )
              case 'T_TableTravelAllowance':
                return (
                  <div className="c-row" key={index}>
                    <TravelAllowance id_table={undefined} parentCallback={callBackFunction2} />
                  </div>
                )
              default:
                formHTML += "";
                break;
            }
          })
        }
      </form>
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
        <button className="btn btn--from btn--gray" onClick={handleSubmit} data-status="draft">下書き保存</button>
        <button className="btn btn--from btn--blue" onClick={handleSubmit} data-status="apply">申請する</button>
      </div>
      <ButtonBack onHandle={handleBackIndex} />
    </>
  )
}
