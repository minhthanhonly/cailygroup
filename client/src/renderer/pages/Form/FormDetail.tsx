import { useParams } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useEffect, useState } from "react";
import { ReactFormBuilder, ReactFormGenerator } from "react-form-builder2";
import { json } from "express";

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
// {
//   key: 'TestComponent',
//   element: 'CustomElement',
//   component: TestComponent,
//   type: 'custom',
//   field_name: 'test_component',
//   name: 'Something You Want',
//   icon: 'fa fa-cog',
//   static: true,
//   props: { test: 'test_comp' },
//   label: 'Label Test',
// },
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

export default function FormDetail(){
  const axiosPrivate = useAxiosPrivate();
  const {id} = useParams();
  const [formValue, setFormValue] = useState({ form_name: '', status: 'publish', owner: 'Admin'})
  const [formData, setFormData] = useState({reactFormData: {}});
  useEffect(() => {
    axiosPrivate.get('form/detail/'+id).then(response => {
      setFormData(response.data);
      console.log(formData.reactFormData);
    })
  }, [])

  return (
    <>
      <h1>Form Demo</h1>
      {/* {formData.reactFormData} */}
      {/* <ReactFormGenerator
        customToolbarItems={items}
        edit
        data={reactFormData}
      /> */}
    </>
  )
}
