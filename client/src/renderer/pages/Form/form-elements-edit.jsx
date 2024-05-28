import React, { useState } from 'react';
import TextAreaAutosize from 'react-textarea-autosize';
import {
  ContentState, EditorState, convertFromHTML, convertToRaw,
} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { Editor } from 'react-draft-wysiwyg';

import DynamicOptionList from './dynamic-option-list';
import DynamicOptionListInProps from './DynamicOptionListInProps'
// import { get } from './stores/requests';
import ID from './UUID';
// import IntlMessages from './language-provider/IntlMessages';

const toolbar = {
  options: ['inline', 'list', 'textAlign', 'fontSize', 'link', 'history'],
  inline: {
    inDropdown: false,
    className: undefined,
    options: ['bold', 'italic', 'underline', 'superscript', 'subscript'],
  },
};

export default class FormElementsEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      element: this.props.element,
      data: this.props.data,
      dirty: false,
    };
  }

  toggleRequired() {
    // const this_element = this.state.element;
  }

  editElementProp(elemProperty, targProperty, e) {
    // elemProperty could be content or label
    // targProperty could be value or checked
    const this_element = this.state.element;
    this_element[elemProperty] = e.target[targProperty];

    this.setState({
      element: this_element,
      dirty: true,
    }, () => {
      if (targProperty === 'checked') { this.updateElement(); }
    });
  }

  editElementHaveProp(elemProperty, propsProperty, targProperty, e) {
    // elemProperty could be content or label
    // targProperty could be value or checked
    let this_element = this.state.element;
    // let this_element_add_tittle_and_checkbox = false;
    this_element[elemProperty].map((option) => {
      switch (propsProperty){
        case 'days':
          option.days = e.target[targProperty];
          break;
        case 'times':
          option.times = e.target[targProperty];
          break;
        case 'timesto':
          option.timesto = e.target[targProperty];
          break;
        // case 'title':
        //   option.timesto = e.target[targProperty];
        //   this_element_add_tittle_and_checkbox = option.timesto;
        //   break;
      }
    });

    this.setState({
      element: this_element,
      dirty: true,
      // this_element_add_tittle_and_checkbox: true,
    }, () => {
      if (targProperty === 'checked') { this.updateElement(); }
    });
  }

  onEditorStateChange(index, property, editorContent) {
    // const html = draftToHtml(convertToRaw(editorContent.getCurrentContent())).replace(/<p>/g, '<div>').replace(/<\/p>/g, '</div>');
    const html = draftToHtml(convertToRaw(editorContent.getCurrentContent())).replace(/<p>/g, '').replace(/<\/p>/g, '').replace(/&nbsp;/g, ' ')
      .replace(/(?:\r\n|\r|\n)/g, ' ');
    const this_element = this.state.element;
    this_element[property] = html;

    this.setState({
      element: this_element,
      dirty: true,
    });
  }

  onEditorHavePropStateChange(elemProperty, propsProperty, index, e) {
    // elemProperty could be content or label
    // targProperty could be value or checked
    let this_element = this.state.element;
    if(propsProperty === 'title') {
      this_element[elemProperty][index].title = e.target.value;
    }
    if(propsProperty === 'text') {
      this_element[elemProperty][index].text = e.target.value;
    }

    this.setState({
      element: this_element,
      dirty: true,
    });
  }

  updateElement() {
    const this_element = this.state.element;
    // to prevent ajax calls with no change
    if (this.state.dirty) {
      this.props.updateElement.call(this.props.preview, this_element);
      this.setState({ dirty: false });
    }
  }

  convertFromHTML(content) {
    const newContent = convertFromHTML(content);
    if (!newContent.contentBlocks || !newContent.contentBlocks.length) {
      // to prevent crash when no contents in editor
      return EditorState.createEmpty();
    }
    const contentState = ContentState.createFromBlockArray(newContent);
    return EditorState.createWithContent(contentState);
  }

  addOptions() {
    const optionsApiUrl = document.getElementById('optionsApiUrl').value;
    if (optionsApiUrl) {
      get(optionsApiUrl).then(data => {
        this.props.element.custom_options = [];
        const { options } = this.props.element;
        data.forEach(x => {
          // eslint-disable-next-line no-param-reassign
          x.key = ID.uuid();
          options.push(x);
        });
        const this_element = this.state.element;
        this.setState({
          element: this_element,
          dirty: true,
        });
      });
    }
  }

  render() {
    if (this.state.dirty) {
      this.props.element.dirty = true;
    }

    const this_checked = this.props.element.hasOwnProperty('required') ? this.props.element.required : false;
    const this_props_days = this.props.element.hasOwnProperty('props') ? this.props.element.props[0].days : false;
    const this_props_times = this.props.element.hasOwnProperty('props') ? this.props.element.props[0].times : false;
    const this_props_timesto = this.props.element.hasOwnProperty('props') ? this.props.element.props[0].timesto : false;
    const this_props_title = this.props.element.hasOwnProperty('props') ? this.props.element.props[0].title : false;
    const this_read_only = this.props.element.hasOwnProperty('readOnly') ? this.props.element.readOnly : false;
    const this_default_today = this.props.element.hasOwnProperty('defaultToday') ? this.props.element.defaultToday : false;
    const this_show_time_select = this.props.element.hasOwnProperty('showTimeSelect') ? this.props.element.showTimeSelect : false;
    const this_show_time_select_only = this.props.element.hasOwnProperty('showTimeSelectOnly') ? this.props.element.showTimeSelectOnly : false;
    const this_show_time_input = this.props.element.hasOwnProperty('showTimeInput') ? this.props.element.showTimeInput : false;
    const this_checked_inline = this.props.element.hasOwnProperty('inline') ? this.props.element.inline : false;
    const this_checked_bold = this.props.element.hasOwnProperty('bold') ? this.props.element.bold : false;
    const this_checked_italic = this.props.element.hasOwnProperty('italic') ? this.props.element.italic : false;
    const this_checked_center = this.props.element.hasOwnProperty('center') ? this.props.element.center : false;
    const this_checked_page_break = this.props.element.hasOwnProperty('pageBreakBefore') ? this.props.element.pageBreakBefore : false;
    const this_checked_alternate_form = this.props.element.hasOwnProperty('alternateForm') ? this.props.element.alternateForm : false;

    const {
      canHavePageBreakBefore, canHaveAlternateForm, canHaveDisplayHorizontal, canHaveOptionCorrect, canHaveOptionValue,
    } = this.props.element;
    const canHaveImageSize = (this.state.element.element === 'Image' || this.state.element.element === 'Camera');

    const this_files = this.props.files.length ? this.props.files : [];
    if (this_files.length < 1 || (this_files.length > 0 && this_files[0].id !== '')) {
      this_files.unshift({ id: '', file_name: '' });
    }

    let editorState;
    if (this.props.element.hasOwnProperty('content')) {
      editorState = this.convertFromHTML(this.props.element.content);
    }
    if (this.props.element.hasOwnProperty('label')) {
      editorState = this.convertFromHTML(this.props.element.label);
    }

    let titlePropsState = [];
    let textPropsState = '';
    if (this.props.element.hasOwnProperty('props')) {
      if(this.props.element.props.some(item => item["title"] !== undefined)){
        this.props.element.props.map((ele) => {
          titlePropsState.push(ele.title);
        })
      }

      if(this.props.element.props.some(item => item["text"] !== undefined)){
        this.props.element.props.map((ele) => {
          textPropsState = ele.text;
        })
      }
    }

    return (
      <div>
        <div className="clearfix">
          <h4 className="float-left">{this.props.element.text}</h4>
          <i className="float-right fas fa-times dismiss-edit" onClick={this.props.manualEditModeOff}></i>
        </div>
        { this.props.element.hasOwnProperty('content') &&
          <div className="form-group">
            <label className="control-label">Display Label:</label>
            <Editor
              toolbar={toolbar}
              defaultEditorState={editorState}
              onBlur={this.updateElement.bind(this)}
              onEditorStateChange={this.onEditorStateChange.bind(this, 0, 'content')}
              stripPastedStyles={true} />
          </div>
        }
        { this.props.element.hasOwnProperty('label') &&
          <div className="form-group">
            <label className="control-label">Display Label:</label>
            <Editor
              toolbar={toolbar}
              defaultEditorState={editorState}
              onBlur={this.updateElement.bind(this)}
              onEditorStateChange={this.onEditorStateChange.bind(this, 0, 'label')}
              stripPastedStyles={true} />
            <div className="custom-control custom-checkbox mt30">
              <input id="is-required" className="custom-control-input" type="checkbox" checked={this_checked} value={true} onChange={this.editElementProp.bind(this, 'required', 'checked')} />
              <label className="custom-control-label" htmlFor="is-required">必須</label>
            </div>
            { this.props.element.hasOwnProperty('showTimeInput') &&
              <div className="custom-control custom-checkbox">
                <input id="show-time-input" className="custom-control-input" type="checkbox" checked={this_show_time_input} value={true} onChange={this.editElementProp.bind(this, 'showTimeInput', 'checked')} />
                <label className="custom-control-label" htmlFor="show-time-input">showTimeInput</label>
              </div>
            }
          </div>
        }
        {
          // this.props.element.props.some(item => item["title"] !== undefined) &&
          this.props.element.hasOwnProperty('props') &&
          <div className="form-group">
            {
              titlePropsState.map((title, index) => {
                return (
                  <div className="custom-control mt30" key={index}>
                    <label className="control-label">Display Title:</label>
                    <div className="w30per">
                      <input type="text" name={`title_${index}`} className="custom-control-input c-form-control" defaultValue={title} onChange={this.onEditorHavePropStateChange.bind(this, 'props', 'title', index)} />
                    </div>

                    <label className="control-label mt20">Display Setting Checkbox:</label>
                    <DynamicOptionListInProps
                    // showCorrectColumn={this.props.showCorrectColumn}
                    // canHaveOptionCorrect={canHaveOptionCorrect}
                    canHaveOptionValue={canHaveOptionValue}
                    data={this.props.preview.state.data}
                    updateElement={this.props.updateElement}
                    element={this.props.element}
                    index={index}/>
                  </div>
                )
              })
            }

          </div>
        }
        { this.props.element.hasOwnProperty('custom_options') &&
          <DynamicOptionList
            // showCorrectColumn={this.props.showCorrectColumn}
            // canHaveOptionCorrect={canHaveOptionCorrect}
            canHaveOptionValue={canHaveOptionValue}
            data={this.props.preview.state.data}
            updateElement={this.props.updateElement}
            preview={this.props.preview}
            element={this.props.element}
            key={this.props.element.custom_options.length} />
        }
        {
          this.props.element.hasOwnProperty('props') && this.props.element.props.some(item => item["days"] !== undefined) &&
          <div className="form-group mt30">
            <div className="custom-control custom-checkbox">
              <input id="is-days" className="custom-control-input" type="checkbox" value={true} checked={this_props_days} onChange={this.editElementHaveProp.bind(this, 'props', 'days', 'checked')}/>
              <label className="custom-control-label" htmlFor="is-days">日間</label>
            </div>
          </div>
        }
        {
          this.props.element.hasOwnProperty('props') && this.props.element.props.some(item => item["times"] !== undefined) &&
          <div className="form-group mt10">
            <div className="custom-control custom-checkbox">
              <input id="is-times" className="custom-control-input" type="checkbox" value={true} checked={this_props_times} onChange={this.editElementHaveProp.bind(this, 'props', 'times', 'checked')}/>
              <label className="custom-control-label" htmlFor="is-times">Time</label>
            </div>
          </div>
        }
        {
          this.props.element.hasOwnProperty('props') && this.props.element.props.some(item => item["timesto"] !== undefined) &&
          <div className="form-group mt10">
            <div className="custom-control custom-checkbox">
              <input id="is-timesto" className="custom-control-input" type="checkbox" value={true} checked={this_props_timesto} onChange={this.editElementHaveProp.bind(this, 'props', 'timesto', 'checked')}/>
              <label className="custom-control-label" htmlFor="is-timesto">Time (from~to)</label>
            </div>
          </div>
        }
        {
          this.props.element.hasOwnProperty('props') && this.props.element.props.some(item => item["text"] !== undefined) &&
          <div className="form-group">
            <label className="control-label">Display Text:</label>
            <textarea className='c-form-control' cols="30" rows="10" onChange={this.onEditorHavePropStateChange.bind(this, 'props', 'text', 0)} defaultValue={textPropsState}></textarea>
          </div>
        }
      </div>
    );
  }
}
FormElementsEdit.defaultProps = { className: 'edit-element-fields' };
