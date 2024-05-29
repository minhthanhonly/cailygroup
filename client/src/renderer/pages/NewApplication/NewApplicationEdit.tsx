import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { axiosPrivate } from "../../api/axios";
import { Heading2 } from "../../components/Heading";
import { isValidForm } from "../../components/Validate";
import { ElementStore, ReactFormBuilder, Registry } from "react-form-builder2";
import FormElementsEdit from "../Form/form-elements-edit";
import F_Text from "../Form/Field/F_Text";
import F_TextAndLabel from "../Form/Field/F_TextAndLabel";
import F_InputText from "../Form/Field/F_InputText";
import F_Checkbox from "../Form/Field/F_Checkbox";
import F_CheckboxAndDate from "../Form/Field/F_CheckboxAndDate";
import F_CheckboxAndTitle from "../Form/Field/F_CheckboxAndTitle";
import F_CheckboxAndInputText from "../Form/Field/F_CheckboxAndInputText";
import F_RadioButtons from "../Form/Field/F_RadioButtons";
import F_TextArea from "../Form/Field/F_TextArea";
import F_DatePicker from "../Form/Field/F_DatePicker";
import F_InputFile from "../Form/Field/F_InputFile";
import TravelExpenses from "../Estimate/TravelExpenses";
import ExpenseReport from "../Estimate/ExpenseReport";
import PriceBusinessReport from "../Estimate/PriceBusinessReport";
import TravelAllowance from "../Estimate/TravelAllowance";

Registry.register('F_Text', F_Text);
Registry.register('F_TextAndLabel', F_TextAndLabel);
Registry.register('F_InputText', F_InputText);
Registry.register('F_Checkbox', F_Checkbox);
Registry.register('F_CheckboxAndDate', F_CheckboxAndDate);
Registry.register('F_CheckboxAndTitle', F_CheckboxAndTitle);
Registry.register('F_CheckboxAndInputText', F_CheckboxAndInputText);
Registry.register('F_RadioButtons', F_RadioButtons);
Registry.register('F_TextArea', F_TextArea);
Registry.register('F_DatePicker', F_DatePicker);
Registry.register('F_InputFile', F_InputFile);
Registry.register('T_TableTravelExpenses', TravelExpenses);
Registry.register('T_TableExpenseReport', ExpenseReport);
Registry.register('T_TablePriceBusinessReport', PriceBusinessReport);
Registry.register('T_TableTravelAllowance', TravelAllowance);

export default function NewApplicationEdit(){
  const {id} = useParams();
  const [formName, setFormName] = useState('');
  const [formValue, setFormValue] = useState({ form_name: '', form_description: '', status: 1, owner: 'Admin' });
  const [formDescription, setFormDescription] = useState('');
  const [reactFormData, setReactFormData] = useState<any>([]);
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');

  const fetchNewApplicationById = async () => {
    try {
      const res = await axiosPrivate.get("newapplication/detail/" + id);
      const data = res.data;
      const parsedFormJson = JSON.parse(data[0].form);
      const field = [
        ...parsedFormJson.reactFormData, // Giữ nguyên các trường từ dữ liệu cũ
      ];

      setFormValue(data[0]);
      setFormName(data[0].form_name);
      setFormDescription(data[0].form_description);

      field.forEach(obj => {
        reactFormData.push(obj);
      });

    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  useEffect(()=> {
    fetchNewApplicationById();
    ElementStore.subscribe((state:any)=>handleUpdate(state.data));
  },[])


  const items = [
    {
      key: 'F_Text',
      element: 'CustomElement',
      component: F_Text,
      type: 'custom',
      name: 'Text',
      static: true,
      icon: 'fa fa-paragraph',
      content: '期間',
      group_name: 'Text',
    },
    {
      key: 'F_TextAndLabel',
      element: 'CustomElement',
      component: F_TextAndLabel,
      type: 'custom',
      field_name: 'my_text_and_label',
      name: 'Text and Label',
      static: true,
      icon: 'fa fa-paragraph',
      label: '毎月の支給方法',
      group_name: 'Text',
      props: [
        { text: '【時給制の場合】普通運賃の勤務日数分を支給　　【月給制の場合】1ヵ月分の定期券代金を支給', }
      ]
    },
    {
      key: 'F_InputText',
      element: 'CustomElement',
      component: F_InputText,
      type: 'custom',
      field_name: 'my_input_',
      name: 'Input Text',
      static: true,
      icon: 'fas fa-font',
      label: '行先',
    },
    {
      key: 'F_Checkbox',
      element: 'CustomElement',
      component: F_Checkbox,
      type: 'custom',
      field_name: 'my_checkbox_',
      name: 'Checkbox',
      static: true,
      icon: 'far fa-check-square',
      label: '行先',
      group_name: 'Checkbox',
      custom_options: [
        {
          value: 'checkbox_value_1',
          text: '遅刻',
          key: 'checkboxes_option_1',
        },
        {
          value: 'checkbox_value_2',
          text: '早退',
          key: 'checkboxes_option_2',
        },
        {
          value: 'checkbox_value_3',
          text: '時間外勤務',
          key: 'checkboxes_option_3',
        },
      ]
    },
    {
      key: 'F_CheckboxAndDate',
      element: 'CustomElement',
      component: F_CheckboxAndDate,
      type: 'custom',
      field_name: 'my_checkbox_and_date',
      name: 'Checkbox and Date',
      static: true,
      icon: 'far fa-check-square',
      label: '適用開始年月日',
      group_name: 'Checkbox',
      custom_options: [
        {
          value: 'checkbox_value_1',
          text: '入社日から適用',
          key: 'checkboxes_option_1',
        },
      ]
    },
    {
      key: 'F_CheckboxAndTitle',
      element: 'CustomElement',
      component: F_CheckboxAndTitle,
      type: 'custom',
      field_name: 'my_checkbox_and_title',
      name: 'Checkbox and Title',
      static: true,
      icon: 'far fa-check-square',
      label: '休暇区分',
      group_name: 'Checkbox',
      props: [
        {
          title: '有給休暇',
          checkboxOptions: [
            {
              value: 'checkbox_value_1',
              text: '全休',
              key: 'checkboxes_option_1',
            },
            {
              value: 'checkbox_value_2',
              text: '午前休',
              key: 'checkboxes_option_2',
            },
            {
              value: 'checkbox_value_3',
              text: '午後休',
              key: 'checkboxes_option_3',
            },
          ],
        },
        {
          title: '無給休暇',
          checkboxOptions: [
            {
              value: 'checkbox_value_1',
              text: '慶弔休暇',
              key: 'checkboxes_option_1',
            },
            {
              value: 'checkbox_value_2',
              text: '生理休暇',
              key: 'checkboxes_option_2',
            },
            {
              value: 'checkbox_value_3',
              text: '子の看護休暇',
              key: 'checkboxes_option_3',
            },
          ],
        },
      ]
    },
    {
      key: 'F_CheckboxAndInputText',
      element: 'CustomElement',
      component: F_CheckboxAndInputText,
      type: 'custom',
      field_name: 'my_checkbox_and_inputtext',
      name: 'Checkbox and Input Text',
      static: true,
      icon: 'far fa-check-square',
      label: '出張先',
      group_name: 'Checkbox',
      custom_options: [
        {
          value: 'checkbox_value_1',
          text: '国内',
          key: 'checkboxes_option_1',
        },
        {
          value: 'checkbox_value_2',
          text: '海外',
          key: 'checkboxes_option_2',
        }
      ]
    },
    {
      key: 'F_RadioButtons',
      element: 'CustomElement',
      component: F_RadioButtons,
      type: 'custom',
      field_name: 'my_radio_',
      name: 'Radio',
      static: true,
      icon: 'far fa-dot-circle',
      label: '行先',
      custom_options: [
        {
          value: 'radio_value_1',
          text: '遅刻',
          key: 'radio_option_1',
        },
        {
          value: 'radio_value_2',
          text: '早退',
          key: 'radio_option_2',
        },
        {
          value: 'radio_value_3',
          text: '時間外勤務',
          key: 'radio_option_3',
        },
      ]
    },
    {
      key: 'F_TextArea',
      element: 'CustomElement',
      component: F_TextArea,
      type: 'custom',
      name: 'Textarea',
      static: true,
      icon: 'fas fa-text-height',
      label: '事由',
    },
    {
      key: 'F_DatePicker',
      element: 'CustomElement',
      component: F_DatePicker,
      type: 'custom',
      field_name: 'caily_datepicker_',
      name: 'Datepicker',
      static: true,
      icon: 'far fa-calendar-alt',
      label: '期間',
      custom_options: [
        {
          value: '',
          text: '期間 (From)',
          key: 'datepicker_option_1',
        },
        {
          value: '',
          text: '期間 (To)',
          key: 'datepicker_option_2',
        },
      ],
      props: [
        { days: false },
        { times: false },
        { timesto: false },
      ]
    },
    {
      key: 'F_InputFile',
      element: 'CustomElement',
      component: F_InputFile,
      type: 'custom',
      name: 'File',
      static: true,
      icon: 'fas fa-file',
      label: '領収書添付',
    },
    {
      key: 'T_TableTravelExpenses',
      element: 'CustomElement',
      component: TravelExpenses,
      type: 'custom',
      field_name: 'caily_table_travel_expenses',
      name: 'Table Travel Expenses',
      static: true,
      icon: 'fas fa-table',
      group_name: 'Table',
    },
    {
      key: 'T_TableExpenseReport',
      element: 'CustomElement',
      component: ExpenseReport,
      type: 'custom',
      field_name: 'caily_table_expense_report',
      name: 'Table Expense Report',
      static: true,
      icon: 'fas fa-table',
      group_name: 'Table',
    },
    {
      key: 'T_TablePriceBusinessReport',
      element: 'CustomElement',
      component: PriceBusinessReport,
      type: 'custom',
      field_name: 'caily_table_price_business_report',
      name: 'Table Price Business Report',
      static: true,
      icon: 'fas fa-table',
      group_name: 'Table',
    },
    {
      key: 'T_TableTravelAllowance',
      element: 'CustomElement',
      component: TravelAllowance,
      type: 'custom',
      field_name: 'caily_table_travel_allowance',
      name: 'Table Travel Allowance',
      static: true,
      icon: 'fas fa-table',
      group_name: 'Table',
    },
  ];

  const handleInput = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value })
  }

  const handleTextareaChange = (e) => {
    const newValue = e.target.value.replace(/\n/g, ''); // Xóa tất cả các ký tự '\n'
    setFormDescription(newValue);
  }

  const handleUpdate = (data:any) => {
    setReactFormData(data);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = isValidForm({ ...formValue }, reactFormData);
    if (validationErrors === true) {
      const formDataUpdate = {
        id: id,
        form_name: formValue.form_name,
        formDescription,
        reactFormData,
        status: 1,
        owner: formValue.owner
      }

      const currentStatus = e.currentTarget.getAttribute('data-status');
      if (currentStatus === "draft") {
        formDataUpdate.status = 0;
      }

      if(formDataUpdate.reactFormData.length === reactFormData.length) {
        const res = await axiosPrivate.post("newapplication/update", formDataUpdate);
        if (res.data.success === 'error') {
          setError('Bị lỗi khi cập nhật Form');
        } else {
          setMsg('Cập nhật Form thành công');
          setTimeout(() => {
            navigate('/newapplication');
          }, 2000);
        }
      } else {
        setError('Bị lỗi khi cập nhật Form');
      }
    }
  }

  return (
    <>
      <Heading2 text="Edit Form" />
      {error == '' ? '' : <div className="box-bg --full mb20"><p className="bg bg-red">{error}</p></div>}
      {msg == '' ? '' : <div className="box-bg --full mb20"><p className="bg bg-green">{msg}</p></div>}
      <div className="c-form">
        <input
          className="c-form-control"
          type="text"
          name="form_name"
          defaultValue={formValue.form_name} onChange={handleInput} placeholder="Enter name here"
        />
      </div>
      <div className="c-form">
        <textarea className="c-form-control" name="form_description" placeholder="Enter description here" defaultValue={formValue.form_description} onChange={handleTextareaChange}></textarea>
      </div>
      <div className="c-form mt50">
        <ReactFormBuilder
          data={reactFormData}
          toolbarItems={items}
          onSubmit={handleSubmit}
          onChange={handleUpdate}
          renderEditForm={props => <FormElementsEdit {...props} />}
        />
      </div>
      <div className="wrp-button">
        <button className="btn btn--from btn--gray" onClick={handleSubmit} data-status="draft">下書き保存</button>
        <button className="btn btn--from btn--blue" onClick={handleSubmit} data-status="apply">申請する</button>
      </div>
    </>
  )
}
