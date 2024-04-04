import { ReactFormBuilder, ElementStore, Registry, ReactFormGenerator } from "react-form-builder2";
import 'react-form-builder2/dist/app.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './form.scss';
import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const TestComponent = () => <h2>Hello</h2>;
const MyInput = React.forwardRef((props, ref) => {
  const { name, defaultValue, disabled } = props;
  return <input ref={ref} name={name} defaultValue={defaultValue} disabled={disabled} />;
});

const GuisInput = React.forwardRef((props, ref) => {
  const { name } = props;
  return (
    <>
      <div className="group_box">
        <div className="grid-row group_box--grid">
          <div className="group_box--title">
            <p>期間 <span className="txt-red">（必須）</span></p>
          </div>
          <div className="group_box__insert">
            <div className="grid-row group_box--form ">
              <div className="group_box--box">
                <div className="group_box--flex">
                  <input type="text" className="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

// const GuisInput = (name: string) => {
//   return <input name={name} />
// }

// Registry.register('GuisInput', GuisInput);
// Registry.register('MyInput', MyInput);
// Registry.register('TestComponent', TestComponent);


const items = [{
  key: 'Header',
  name: 'Header Text',
  icon: 'fas fa-heading',
  static: true,
  content: 'Placeholder Text...'
},
{
  key: 'Paragraph',
  name: 'Paragraph',
  static: true,
  icon: 'fa fa-paragraph',
  content: 'Placeholder Text...'
},
{
  key: 'TextInput',
  name: 'Input Text',
  static: true,
  icon: 'fas fa-font',
  content: 'Placeholder Text...'
},
{
  key: 'Checkboxes',
  name: 'Checkbox',
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
  key: 'TextArea',
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
{
  key: 'Date (from~to)',
  name: 'Input Date',
  static: true,
  icon: 'fa fa-paragraph',
  content: 'Placeholder Text...'
},
{
  key: 'TestComponent',
  element: 'CustomElement',
  component: TestComponent,
  type: 'custom',
  field_name: 'test_component',
  name: 'Something You Want',
  icon: 'fa fa-cog',
  static: true,
  props: { test: 'test_comp' },
  label: 'Label Test',
},
// {
//   key: 'MyInput',
//   element: 'CustomElement',
//   component: MyInput,
//   type: 'custom',
//   forwardRef: true,
//   field_name: 'my_input_',
//   name: 'My Input',
//   icon: 'fa fa-cog',
//   props: { test: 'test_input' },
//   label: 'Label Input',
// },
// {
//   key: 'GuisInput',
//   element: 'CustomElement',
//   component: GuisInput,
//   type: 'custom',
//   field_name: 'guis_input_',
//   name: 'Guis Input',
//   icon: 'fa fa-cog',
//   label: 'Guis Input',
// },
];

export default function FormAdd(){
  const axiosPrivate = useAxiosPrivate();
	const [formValue, setFormValue] = useState({ form_name: '', status: 'publish', owner: 'Admin'})
  const [reactFormData, setReactFormData] = useState<any>([]);

  const [previewVisible, setPreviewVisible] = useState<boolean>(false);
  const showPreview = () => {
    // this.saveFormData()
    // this.setState({
    //   previewVisible: true,
    // });
    setPreviewVisible(true)
  };


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
        <button className="btn btn-primary float-right" style={{ marginRight: '10px' }} onClick={showPreview}>Preview Form</button>

        <ReactFormBuilder
          data={reactFormData}
          onChange={setReactFormData}
          onSubmit={handleSubmit}
        />
      </div>

    </>
  )
}
function showPreview() {
  throw new Error("Function not implemented.");
}

