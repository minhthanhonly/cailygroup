import { Editor } from 'react-draft-wysiwyg';
import {
  ContentState, EditorState, convertFromHTML, convertToRaw,
} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { useEffect, useState } from 'react';

const toolbar = {
  options: ['inline', 'list', 'textAlign', 'fontSize', 'link', 'history'],
  inline: {
    inDropdown: false,
    className: undefined,
    options: ['bold', 'italic', 'underline', 'superscript', 'subscript'],
  },
};


export default function FormElementsEdit({...props}){


  // const [fieldValue, setFieldValue] = useState({text:''});
  // console.log(props.element.props);
  // useEffect(() => {setFieldValue(props.element.props)},[])

  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const onEditorStateChange = (index, property, editorContent) => {
    const html = draftToHtml(convertToRaw(editorContent.getCurrentContent())).replace(/<p>/g, '').replace(/<\/p>/g, '').replace(/&nbsp;/g, ' ')
      .replace(/(?:\r\n|\r|\n)/g, ' ');

    const this_element = props.element;
    this_element[property] = html;
    console.log(html);
    // this_element[property] = html;
};

  return (
    <div>
      {/* <p>{fieldValue.text}</p>
      <input type="text" defaultValue={fieldValue.text} /> */}
      <Editor


        stripPastedStyles={true} />
    </div>
  )
}
