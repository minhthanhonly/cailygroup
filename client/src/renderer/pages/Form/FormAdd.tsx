import { ReactFormBuilder, Registry } from "react-form-builder2";
import 'react-form-builder2/dist/app.css';
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './Form.scss';
import { useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

import F_Text from "./Field/F_Text";
import F_InputText from "./Field/F_InputText";
import F_Checkbox from "./Field/F_Checkbox";
import F_TextArea from "./Field/F_TextArea";
import FormElementsEdit from "./FormElementsEdit";
import { Heading2 } from "../../components/Heading";

Registry.register('F_Text', F_Text);
Registry.register('F_InputText', F_InputText);
Registry.register('F_Checkbox', F_Checkbox);
Registry.register('F_TextArea', F_TextArea);

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
    key: 'RadioButtons',
    name: 'Radio',
    static: true,
    icon: 'far fa-dot-circle',
    content: 'Placeholder Text...'
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
    key: 'DatePicker',
    name: 'Input Date',
    static: true,
    icon: 'far fa-calendar-alt',
    content: 'Placeholder Text...'
  },
];

// const items = [
//   {
//     key: 'TextInput',
//     icon: 'fas fa-font',
//     static: true,
//     label: '期間',
//   }

// ]
export default function FormAdd(){
  const axiosPrivate = useAxiosPrivate();
	const [formValue, setFormValue] = useState({ form_name: '', status: 'publish', owner: 'Admin'})
  const [reactFormData, setReactFormData] = useState<any>([]);

  const handleInput = (e) => {
		setFormValue({ ...formValue, [e.target.name]: e.target.value })
	}

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = { form_name: formValue.form_name, reactFormData, status: formValue.status, owner: formValue.owner }
    const res = await axiosPrivate.post("form/add", formData);
  }

  return (
    <>
      <div className="c-form">
        <Heading2 text="Add New Form" />
        <input
          className="form-input"
          type="text"
          name="form_name"
          value={formValue.form_name} onChange={handleInput} placeholder="Enter name here"
        />
        <ReactFormBuilder
          toolbarItems={items}
          data={reactFormData}
          onChange={setReactFormData}
          onSubmit={handleSubmit}
          renderEditForm={props => <FormElementsEdit {...props}/>}
        />
        {/* <ReactFormBuilder
          toolbarItems={items}
          data={reactFormData}
          onChange={setReactFormData}
          onSubmit={handleSubmit}
        /> */}
        <div className="wrp-button">
          <button className="btn btn--from btn--gray">下書き保存</button>
          <button className="btn btn--from btn--blue" onClick={handleSubmit}>申請する</button>
        </div>
      </div>
    </>
  )
}
