import { ReactFormBuilder, Registry } from "react-form-builder2";
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

export default function FormAdd(){
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
      label: '行先',
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
  ];

  const axiosPrivate = useAxiosPrivate();
	const [formValue, setFormValue] = useState({ form_name: '', status: 'publish', owner: 'Admin'})
  const [reactFormData, setReactFormData] = useState<any>([]);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [error, setError] = useState('');

  const [toolbarClicked, setToolbarClicked] = useState(false);

  const handleToolbarClick = () => {
    // Khi toolbar được click, cập nhật trạng thái
    console.log('hello');
    setToolbarClicked(true);
  };

  const handleInput = (e) => {
		setFormValue({ ...formValue, [e.target.name]: e.target.value })
	}

  // if(reactFormData.length > 0){
  //   setIsDisabled(false);
  // } else {
  //   setIsDisabled(true);
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const formData = { form_name: formValue.form_name, reactFormData, status: formValue.status, owner: formValue.owner }
    // const res = await axiosPrivate.post("form/add", formData);

    // console.log(reactFormData.length);
  }




  return (
    <>
      <div className="c-form">
        <Heading2 text="Add New Form" />
        <input
          className="c-form-control"
          type="text"
          name="form_name"
          value={formValue.form_name} onChange={handleInput} placeholder="Enter name here"
        />
        <ReactFormBuilder
          toolbarClick={handleToolbarClick}
          toolbarItems={items}
          data={reactFormData}
          onChange={setReactFormData}
          onSubmit={handleSubmit}
          renderEditForm={props => <FormElementsEdit {...props}/>}
        />
        <div className="wrp-button">
          <button className="btn btn--from btn--gray" disabled={isDisabled}>下書き保存</button>
          <button className="btn btn--from btn--blue" onClick={handleSubmit} disabled={isDisabled}>申請する</button>
        </div>
        {/* <div className="c-form">
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
        <div className="c-form">
          <div className="c-form-inner">
            <label className="c-form-label"><span>期間</span><span className="c-form-label--required txt-red">（必須）</span></label>
            <div className="c-form-content">
              <div className="grid-row grid-row--02">
                <div className="c-form-item--03">
                  <label className="c-form-label--03"><input type="checkbox" className="c-form-control" /><span className="checkmark"></span>出社</label>
                </div>
                <div className="c-form-item--03">
                  <label className="c-form-label--03"><input type="checkbox" className="c-form-control" /><span className="checkmark"></span>出社</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="c-form">
          <div className="c-form-inner">
            <label className="c-form-label"><span>期間</span><span className="c-form-label--required txt-red">（必須）</span></label>
            <div className="c-form-content">
              <div className="grid-row grid-row--02">
                <div className="c-form-item--03">
                  <label className="c-form-label--03"><input type="radio" name="radio_name_1" className="c-form-control" /><span className="checkmark checkmark--oval"></span>出社</label>
                </div>
                <div className="c-form-item--03">
                  <label className="c-form-label--03"><input type="radio" name="radio_name_1" className="c-form-control" /><span className="checkmark checkmark--oval"></span>出社</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="c-form">
          <div className="c-form-inner">
            <label className="c-form-label"><span>期間</span><span className="c-form-label--required txt-red">（必須）</span></label>
            <div className="c-form-content">
              <input type="text" className="c-form-control" placeholder="入力してください" />
            </div>
          </div>
        </div>
        <div className="c-form">
          <div className="c-form-inner">
            <label className="c-form-label"><span>期間</span><span className="c-form-label--required txt-red">（必須）</span></label>
            <div className="c-form-content">
              <textarea className="c-form-control" placeholder="入力してください"></textarea>
            </div>
          </div>
        </div> */}
      </div>
    </>
  )
}
