import { ReactFormBuilder, ElementStore, Registry } from "react-form-builder2";
import 'react-form-builder2/dist/app.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './form.scss';
import React, { useEffect } from "react";

const TestComponent = () => <h2>Hello</h2>;
const MyInput = React.forwardRef((props, ref) => {
  const { name, defaultValue, disabled } = props;
  return <input ref={ref} name={name} defaultValue={defaultValue} disabled={disabled} />;
});

const GuisInput = (name: string) => {
  return <input name={name} />
}

Registry.register('GuisInput', GuisInput);
Registry.register('MyInput', MyInput);
Registry.register('TestComponent', TestComponent);


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
{
  key: 'MyInput',
  element: 'CustomElement',
  component: MyInput,
  type: 'custom',
  forwardRef: true,
  field_name: 'my_input_',
  name: 'My Input',
  icon: 'fa fa-cog',
  props: { test: 'test_input' },
  label: 'Label Input',
},
{
  key: 'GuisInput',
  element: 'CustomElement',
  component: GuisInput,
  type: 'custom',
  forwardRef: true,
  field_name: 'my_input_',
  name: 'Guis Input',
  icon: 'fa fa-cog',
  props: { test: 'test_input' },
  label: 'Label Input',
},
];

export default function FormAdd(){
  return (
    <>
      <div className="c-form">
        <ReactFormBuilder
          toolbarItems={items}
        />
      </div>

    </>
  )
}
