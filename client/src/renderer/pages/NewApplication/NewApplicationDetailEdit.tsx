import { useNavigate, useParams } from "react-router-dom";
import { axiosPrivate, BASE_URL } from "../../api/axios";
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
import { Heading2 } from "../../components/Heading";
import { ButtonBack } from "../../components/Button/ButtonBack";
import Modal from "../../components/Modal/Modal";
import { isValidTextArea, isValidtextTable } from "../../components/Validate";
import { emitter } from "../../layouts/components/Sidebar";

export default function NewApplicationDetailEdit() {
  const { id, appId } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');
  const [formName, setFormName] = useState('');
  const [appName, setAppName] = useState();
  const [formData, setFormData] = useState<any>([]);
  const [formDataVal, setFormDataVal] = useState<any>([]);
  const [authorizer, setAuthorizer] = useState<any>([]);
  const [coOwner, setCoOwner] = useState<any>([]);
  const [selectedAuth, setSelectedAuth] = useState<any>([]);
  const [selectedGroup, setSelectedGroup] = useState<any>([]);
  const [listOfGroups, setListOfGroups] = useState<any>([]);
  const [listOfMembers, setListOfMembers] = useState<any>([]);
  const [isModalOpen, setModalOpen] = useState(false);

  const childRef = useRef(null);
  const childRefOfCheckbox = useRef(null);
  const childRefOfInputText = useRef(null);

  const fileData = new FormData();

  const users = JSON.parse(localStorage.getItem('users') || '{}');


  const [dataTableEdit, setDataTableEdit] = useState([]);

  /*
  * LẤY THÔNG TIN CHI TIẾT CỦA ĐĂNG KÝ
  */
  const fetchApplicationById = async () => {
    try {

      const res = await axiosPrivate.get("application/edit/" + id);
      const data = res.data;
      const parsedDataJson = JSON.parse(data.datajson);
      const field = [
        ...parsedDataJson.formData, // Giữ nguyên các trường từ dữ liệu cũ
      ];
      setFormDataVal(field);
      // setAppName(parsedDataJson.appName);
      setFormName(parsedDataJson.appName);
      setSelectedAuth(parsedDataJson.authorizer);
      setSelectedGroup(parsedDataJson.coOwner);
      setDataTableEdit(parsedDataJson.tableData);

      console.log("Fetched data: ", parsedDataJson.tableData);
    } catch (error) {
      console.error("Error fetching application data:", error);
    }

  }


  /*
  * LẤY RA FORM THEME CỦA ĐĂNG KÝ
  */
  const fetchApplicationDetailById = async () => {
    try {
      const getAppDetail = await axiosPrivate.get("newapplication/detail/" + appId);
      const data = getAppDetail.data;
      const parsedFormJson = JSON.parse(data[0].form);
      const field = [
        ...parsedFormJson.reactFormData, // Giữ nguyên các trường từ dữ liệu cũ
      ];
      setFormData(field);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  }

  useEffect(() => {
    fetchApplicationById();
    fetchApplicationDetailById();
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
  const [pfile, setPfile] = useState('');
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
        id: '',
        appId: '',
        appName: '',
        formData: [],
        tableData: [],
        id_status: 1,
        userNameReg: '',
        userEmailReg: '',
        user_id: 0,
        authorizer: [],
        coOwner: []
      };
      appJSON.id = id;
      appJSON.appId = appId;
      appJSON.appName = formName;
      appJSON.formData = formDataIsGrouped;
      appJSON.userNameReg = users.realname;
      appJSON.userEmailReg = users.user_email;
      appJSON.user_id = users.id;
      appJSON.authorizer = selectedAuth;
      appJSON.coOwner = selectedGroup;

      const currentStatus = e.currentTarget.getAttribute('data-status');
      if (currentStatus === "draft") {
        appJSON.id_status = 5;
      }

      // if (formRefHaveTable.current) {
      //   //Lấy giá trị của Table
      //   appJSON.tableData = estimate;

      //   //Bắt lỗi Validate các thành phần trong Table
      //   const formElementsInTable = formRefHaveTable.current.elements;

      //   // Lấy tất cả các đối tượng trong Form
      //   for (let i = 0; i < formElementsInTable.length; i++) {
      //     const element = formElementsInTable[i] as HTMLInputElement;

      //     if (element.value === "") {
      //       let validInputTextErrors = false;
      //       validInputTextErrors = isValidtextTable(element.value, element.title);
      //       arrValid.push(validInputTextErrors);
      //       return
      //     }
      //   }
      // } else {
      //   appJSON.tableData = [];
      // }

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
        // console.log(appJsonString);
        const res = await axiosPrivate.post("newapplication/updatedetail", appJsonString);
        if (res.data.success === 'error') {
          setError('Bị lỗi khi chỉnh sửa');
        } else {
          setMsg('Bạn đã cập nhật thành công');
          emitter.emit('reloadSidebar');
          setTimeout(() => {
            navigate('/application/');
          }, 2000);
        }
      }
    }
  }

  const newformData = formData.map(item1 => {
    const correspondingItem = formDataVal.find(item2 => item2.id === item1.id);
    return correspondingItem ? { ...item1, value: correspondingItem.value } : item1;
  })

  // Gọi ra các thành phần của FORM
  const componentMap: { [key: string]: React.FC<{ id: string, label: string, text?: string, required: boolean, value?: any, customProps?: any, customOptions?: any, days?: boolean, times?: boolean, timesto?: boolean, parentCallback?: any, ref?: any, parentFileCallback?: any, parentClearFileCallback?: any }> } = {
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
  const renderedComponents = newformData.map((item, index) => {
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
              value={item.value}
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
                  value={item.value}
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

  /*
  * LẤY DANH SÁCH NHÓM
  */
  const fetchGroup = async () => {
    try {
      const res = await axiosPrivate.get("groups/");
      setListOfGroups(res.data);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  /*
  * LẤY THÔNG TIN NHÓM ĐƯỢC CHIA SẺ
  */
  let getGroup = listOfGroups.filter((item: { id: any; }) => selectedGroup.find((item2: any) => item.id === item2));

  /*
  * LẤY DANH SÁCH THÀNH VIÊN LÀ MANAGER VÀ LEADER
  */
  const fetchMembersByAuthority = async () => {
    try {
      const res = await axiosPrivate.get("users/membersbyauthority");
      setListOfMembers(res.data);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  /*
  * LẤY THÔNG TIN NGƯỜI ỦY QUYỀN CỦA BẢN ĐĂNG KÝ
  */
  let getAuth = listOfMembers.filter((item: { id: any; }) => selectedAuth.find((item2: any) => item.id === item2));

  useEffect(() => {
    fetchGroup();
    fetchMembersByAuthority();
  }, []);

  const openModal = ($id: number) => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  /*
 * XỬ LÝ CHỌN THÀNH VIÊN ỦY QUYỀN
 */
  const handleCheckboxMember = (e) => {
    const { value, name, checked } = e.target;
    if (checked) {
      setSelectedAuth([...selectedAuth, value]);
    } else {
      setSelectedAuth((prevData) => {
        return prevData.filter((id) => {
          return id !== value
        })
      })
    }
  }

  /*
  * XỬ LÝ CHỌN NHÓM ĐƯỢC CHIA SẺ
  */
  const handleCheckboxGroup = (e) => {
    const { value, name, checked } = e.target;
    if (checked) {
      setSelectedGroup([...selectedGroup, value]);
      setCoOwner([...coOwner, name]);
    } else {
      setSelectedGroup((prevData) => {
        return prevData.filter((id) => {
          return id !== value
        })
      })
      setCoOwner((prevData) => {
        return prevData.filter((group_name) => {
          return group_name !== name
        })
      })
    }
  }

  const handleModal = () => {
    setModalOpen(false);
  }

  const handleCloseModal = () => {
    setModalOpen(false);
    setCoOwner([]);
    setSelectedAuth([]);
    setSelectedGroup([]);
  }



  useEffect(() => {
    console.log("dataTableEdit:", dataTableEdit);
  }, [dataTableEdit]);

  console.log("estimate", estimate);
  return (
    <>
      <Heading2 text={formName} />
      {error == '' ? '' : <div className="box-bg --full mb20"><p className="bg bg-red">{error}</p></div>}
      {msg == '' ? '' : <div className="box-bg --full mb20"><p className="bg bg-green">{msg}</p></div>}
      <div className="c-row"><p className="txt-lead">下記の通り申請致します。 </p></div>
      <form ref={formRef}>
        {renderedComponents}
      </form>
      <form ref={formRefHaveTable}>
        {
          formData.map((item, index) => {
            switch (item.key) {
              case 'T_TableTravelExpenses':
                return (
                  <div className="c-row" key={index}>
                    <TravelExpenses id_table={undefined} parentCallback={callBackFunction2} callback={dataTableEdit} />
                  </div>
                )
              case 'T_TableExpenseReport':
                return (
                  <div className="c-row" key={index}>
                    <ExpenseReport id_table={undefined} parentCallback={callBackFunction2} callback={dataTableEdit} />
                  </div>
                )
              case 'T_TablePriceBusinessReport':
                return (
                  <div className="c-row" key={index}>
                    <PriceBusinessReport id_table={undefined} parentCallback={callBackFunction2} callback={dataTableEdit} />
                  </div>
                )
              case 'T_TableTravelAllowance':
                return (
                  <div className="c-row" key={index}>
                    <TravelAllowance id_table={undefined} parentCallback={callBackFunction2} callback={dataTableEdit} />
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
        <p className="box-router__title">承認ルート</p>
        <div className="grid-row box-router__grid">
          <div className="box-router__name">
            <p>承認者:</p>
            <p>
              {getAuth.map((auth, index) => {
                return (<span key={index}>{auth.realname}{index !== getAuth.length - 1 && ', '}</span>)
              })}
            </p>
          </div>
          <div className="box-router__name">
            <p>共有者: </p>
            <p>
              {getGroup.map((group, index) => {
                return (<span key={index}>{group.group_name}{index !== getGroup.length - 1 && ', '}</span>)
              })}
            </p>
          </div>
        </div>
        <div className="box-router__edit">
          <button className="plus-row" onClick={openModal}>承認ルートを編集</button>
        </div>
      </div>
      <div className="wrp-button mt50">
        <button className="btn btn--from btn--gray" data-status="draft">下書き保存</button>
        <button className="btn btn--from btn--blue" onClick={handleSubmit} data-status="apply">更新します。</button>
      </div>
      <ButtonBack onHandle={handleBackIndex} />
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {
          <>
            <Heading2 text="パネルを表示" />
            <div className="grid-row">
              <div className="grid-col--6">
                <table className="table-base table-base--02">
                  <tbody>
                    <tr>
                      <th colSpan={4}>承認者</th>
                    </tr>
                    <tr>
                      <td className="--w5 --center">順序数</td>
                      <td className="--center">氏名</td>
                      <td className="--center">権限</td>
                      <td className="--w2"></td>
                    </tr>
                    {listOfMembers.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td className="--center">{index}</td>
                          <td className="--center">{item.realname}</td>
                          <td className="--center">{item.authority_name}</td>
                          <td>
                            <label className="c-form-label--03">
                              <input type="checkbox" className="c-form-control" checked={selectedAuth.includes(item.id) || authorizer.includes(item.realname) || (selectedAuth[index] == item.id) ? true : false} value={item.id} name={item.realname} onChange={handleCheckboxMember} />
                              <span className="checkmark mr0"></span>
                            </label>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
              <div className="grid-col--6">
                <table className="table-base table-base--02">
                  <tbody>
                    <tr>
                      <th colSpan={3}>共有者</th>
                    </tr>
                    <tr>
                      <td className="--w5 --center">順序数</td>
                      <td className="--center">チーム名</td>
                      <td className="--w2"></td>
                    </tr>
                    {listOfGroups.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td className="--center">{index}</td>
                          <td className="--center">{item.group_name}</td>
                          <td>
                            <label className="c-form-label--03">
                              <input type="checkbox" className="c-form-control" checked={selectedGroup.includes(item.id) || coOwner.includes(item.group_name) || (selectedGroup[index] == item.id) ? true : false} value={item.id} name={item.group_name} onChange={handleCheckboxGroup} />
                              <span className="checkmark mr0"></span>
                            </label>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="wrp-button mt20">
              <button className="btn btn--green" onClick={handleModal}>確定</button>
              <button className="btn btn--orange" onClick={handleCloseModal}>キャンセル</button>
            </div>
          </>
        }
      </Modal>
    </>
  )
}
