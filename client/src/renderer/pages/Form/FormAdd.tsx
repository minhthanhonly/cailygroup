import { ReactFormBuilder } from "react-form-builder2";
import 'react-form-builder2/dist/app.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './Form.scss';
import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

import { Heading2 } from "../../components/Heading";
import FormElementsEdit from "./FormElementsEdit";
import F_Text from "./Field/F_Text";
import F_InputText from "./Field/F_InputText";
import F_Checkbox from "./Field/F_Checkbox";
import F_TextArea from "./Field/F_TextArea";
import F_DatePicker from "./Field/F_DatePicker";
import F_RadioButtons from "./Field/F_RadioButtons";

import { isValidForm } from "../../components/Validate";
import { useNavigate } from "react-router-dom";
import TravelExpenses from "../Estimate/TravelExpenses";
import F_TitleAndCheckbox from "./Field/F_TitleAndCheckbox";
import ExpenseReport from "../Estimate/ExpenseReport";
import PriceBusinessReport from "../Estimate/PriceBusinessReport";
import TravelAllowance from "../Estimate/TravelAllowance";

export default function FormAdd() {
  const axiosPrivate = useAxiosPrivate();
  const [formValue, setFormValue] = useState({ form_name: '', status: 'publish', owner: 'Admin' });
  const [formDescription, setFormDescription] = useState('');
  const [reactFormData, setReactFormData] = useState<any>([]);
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');

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
      key: 'F_TitleAndCheckbox',
      element: 'CustomElement',
      component: F_TitleAndCheckbox,
      type: 'custom',
      field_name: 'my_checkbox_',
      name: 'Title and Checkbox',
      static: true,
      icon: 'far fa-check-square',
      label: '休暇区分',
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = isValidForm({ ...formValue }, reactFormData);
    if (validationErrors === true) {
      const formData = { form_name: formValue.form_name, formDescription, reactFormData, status: formValue.status, owner: formValue.owner }

      const res = await axiosPrivate.post("form/add", formData);
      if (res.data.success === 'error') {
        setError('Bị lỗi khi thêm Form mới');
      } else {
        setMsg('Thêm Form mới thành công');
        setTimeout(() => {
          navigate('/newapplication');
        }, 2000);
      }
    }
  }

  const handleSubmitDraft = async (e) => {
    e.preventDefault();
    const validationErrors = isValidForm({ ...formValue }, reactFormData);
  }

  return (
    <>
      <Heading2 text="Add New Form" />
      {error == '' ? '' : <div className="box-bg --full mb20"><p className="bg bg-red">{error}</p></div>}
      {msg == '' ? '' : <div className="box-bg --full mb20"><p className="bg bg-green">{msg}</p></div>}
      <div className="c-form">
        <input
          className="c-form-control"
          type="text"
          name="form_name"
          value={formValue.form_name} onChange={handleInput} placeholder="Enter name here"
        />
      </div>
      <div className="c-form">
        <textarea className="c-form-control" name="form_description" placeholder="Enter description here" value={formDescription} onChange={handleTextareaChange}></textarea>
      </div>
      <div className="c-form mt50">
        <ReactFormBuilder
          toolbarItems={items}
          data={reactFormData}
          onChange={setReactFormData}
          onSubmit={handleSubmit}
          renderEditForm={props => <FormElementsEdit {...props} />}
        />
      </div>
      <div className="wrp-button">
        <button className="btn btn--from btn--gray" onClick={handleSubmitDraft}>下書き保存</button>
        <button className="btn btn--from btn--blue" onClick={handleSubmit}>申請する</button>
      </div>
      {/*
      <div className="c-form">
        <div className="c-form-inner">
          <label className="c-form-label"><span>期間</span><span className="c-form-label--required txt-red">（必須）</span></label>
          <div className="c-form-content">
            <div className="grid-row">
              <div className="c-form-item">
                <input type="text" className="c-form-control" placeholder="yyyy/mm/dd" />
              </div>
              <div className="c-form-item">
                <input type="text" className="c-form-control" placeholder="yyyy/mm/dd" />
              </div>
              <div className="c-form-item">
                <input type="text" className="c-form-control c-form-control--02" />
                <label className="c-form-label--02">日間</label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="c-form">
        <div className="c-form-inner">
          <label className="c-form-label"><span>期間</span><span className="c-form-label--required txt-red">（必須）</span></label>
          <div className="c-form-content">
            <div className="grid-row">
              <div className="c-form-item">
                <input type="text" className="c-form-control" placeholder="yyyy/mm/dd" />
              </div>
              <div className="c-form-inner">
                <div className="c-form-item--02">
                  <input type="text" className="c-form-control" placeholder="hh:mm" />
                </div>
                <div className="c-form-item--02">
                  <input type="text" className="c-form-control" placeholder="hh:mm" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="c-form">
        <div className="c-form-inner">
          <label className="c-form-label"><span>期間</span><span className="c-form-label--required txt-red">（必須）</span></label>
          <div className="c-form-content">
            <div className="grid-row">
              <div className="c-form-item">
                <input type="text" className="c-form-control" placeholder="yyyy/mm/dd" />
              </div>
              <div className="c-form-item">
                <input type="text" className="c-form-control" placeholder="hh:mm" />
              </div>
            </div>
          </div>
        </div>
      </div>


      */}
    </>
  )
}
