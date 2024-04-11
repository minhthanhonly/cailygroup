import { ReactFormBuilder, Registry } from "react-form-builder2";
import 'react-form-builder2/dist/app.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './Form.scss';
import { useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
// import { items } from "./items";
import F_Text from "./Field/F_Text";
import F_InputText from "./Field/F_InputText";
import F_Checkbox from "./Field/F_Checkbox";
import F_CheckboxGroup from "./Field/F_CheckboxGroup";
import F_TextArea from "./Field/F_TextArea";

Registry.register('F_Text', F_Text);
Registry.register('F_InputText', F_InputText);
Registry.register('F_Checkbox', F_Checkbox);
Registry.register('F_CheckboxGroup', F_CheckboxGroup);
Registry.register('F_TextArea', F_TextArea);

const items = [
  {
    key: 'F_Text',
    element: 'CustomElement',
    component: F_Text,
    type: 'custom',
    field_name: 'my_input_',
    name: 'Text',
    static: true,
    icon: 'fa fa-paragraph',
    props: {text: "期間"},
    content: '期間'
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
  },
  {
    key: 'F_Checkbox',
    element: 'CustomElement',
    component: F_Checkbox,
    type: 'custom',
    name: 'Checkbox',
    static: true,
    icon: 'far fa-check-square',
  },
  {
    key: 'F_CheckboxGroup',
    element: 'CustomElement',
    component: F_CheckboxGroup,
    type: 'custom',
    name: 'Checkbox Group',
    static: true,
    icon: 'far fa-check-square',
    content: 'Placeholder Text...'
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
    content: 'Placeholder Text...'
  },
  {
    key: 'DatePicker',
    name: 'Input Date',
    static: true,
    icon: 'far fa-calendar-alt',
    content: 'Placeholder Text...'
  },
];


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

  const [formElements, setFormElements] = useState<any[]>([]);

  return (
    <>
      <div className="c-form">
        <h2 className="hdg-lv2">
          <span>Add new form:</span>
          <input
            className="form-input"
            type="text"
            name="form_name"
            value={formValue.form_name} onChange={handleInput}
          />
        </h2>
        <button className="btn btn-default float-right" style={{ marginRight: '10px' }} onClick={handleSubmit}>Save Form</button>
        {/* <button className="btn btn-primary float-right" style={{ marginRight: '10px' }} onClick={showPreview}>Preview Form</button> */}

        <ReactFormBuilder
          toolbarItems={items}
          data={reactFormData}
          onChange={setReactFormData}
          onSubmit={handleSubmit}
          // renderEditForm={props => <FormElementsEdit {...props}/>}
        />

      </div>



    </>
  )
}
