import React, { useState, useEffect } from 'react';
import { EditorState, convertToRaw, convertFromRaw, ContentState, convertFromHTML } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { convertToHTML } from 'draft-convert';
import draftToHtml from "draftjs-to-html";
import moment from 'moment'
import DOMPurify from 'dompurify';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import axios, {base} from '../axios-cls';

const BlogEditor = props => {

  const [savedContent, setSavedContent] = useState("")
  const [title, setTitle] = useState("")

  const [editorState, setEditorState] = useState(EditorState.createEmpty(), )
  const [convertedContent, setConvertedContent] = useState(null);

  useEffect(async() => {
    const { data:blog } = await axios.get(base + `blog/${props.blogName}/`)
    // const editorState = await EditorState.createWithContent(convertFromRaw(blog === undefined ? "" : blog.blogEditorContent))
    // setEditorState(editorState)
  }, [])

  const handleEditorChange = state => {
    setEditorState(state);
    convertContentToHTML();
    console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())))
  }

  const convertContentToHTML = () => {
    let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(currentContentAsHTML);
  }
  
  const saveEditorContent = async() => {
      const payload = { 
        title : title,
        ID:props.user.data._id,
        date : moment().format("DD/MM/YYYY"),
        author : props.user.data.user,
        content : draftToHtml(convertToRaw(editorState.getCurrentContent())) 
      }

      const { data : res } = await axios.post(`query/`, payload)
      console.log(res)
  }

  const uploadCallback = file => {
    return new Promise(
        (resolve, reject) => {
            if (file) {
                let reader = new FileReader();
                reader.onload = (e) => {
                    resolve({ data: { link: e.target.result } })
                };
                reader.readAsDataURL(file);
            }
        }
    );
}

  return (
    <div className="">
      <input className="add-title" vlue={title} onChange={e => setTitle(e.target.value)} type="text" placeholder="add title to your query"/>
      <Editor
        editorState={editorState}
        onEditorStateChange={handleEditorChange}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
        placeholder="Add query content"
        editorStyle = {{ minHeight :"50vh" }}
       mention={{
      separator: ' ',
      trigger: '@',
      suggestions: [
        { text: 'APPLE', value: 'apple', url: 'apple' },
        { text: 'BANANA', value: 'banana', url: 'banana' },
        { text: 'CHERRY', value: 'cherry', url: 'cherry' },
        { text: 'DURIAN', value: 'durian', url: 'durian' },
        { text: 'EGGFRUIT', value: 'eggfruit', url: 'eggfruit' },
        { text: 'FIG', value: 'fig', url: 'fig' },
        { text: 'GRAPEFRUIT', value: 'grapefruit', url: 'grapefruit' },
        { text: 'HONEYDEW', value: 'honeydew', url: 'honeydew' },
      ],
    }}
    hashtag={{}}
      />
      <div className="preview" dangerouslySetInnerHTML={{__html: `${draftToHtml(convertToRaw(editorState.getCurrentContent()))}`}}></div>
      <button className="blog-editor-content-save-button" onClick={saveEditorContent}>Save</button>
    </div>
  )
}
export default BlogEditor;