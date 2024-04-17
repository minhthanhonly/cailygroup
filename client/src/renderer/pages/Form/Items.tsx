import { Registry } from "react-form-builder2";
import F_Checkbox from "./Field/F_Checkbox";
import F_CheckboxGroup from "./Field/F_CheckboxGroup";
import F_InputText from "./Field/F_InputText";
import F_Text from "./Field/F_Text_bk";
import F_TextArea from "./Field/F_TextArea";

Registry.register('F_Text', F_Text);
Registry.register('F_InputText', F_InputText);
Registry.register('F_Checkbox', F_Checkbox);
Registry.register('F_CheckboxGroup', F_CheckboxGroup);
Registry.register('F_TextArea', F_TextArea);

export const items = [
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
