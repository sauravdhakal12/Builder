"use client"

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import { addPost } from './actions';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
const QuillEditor = dynamic(() => import('react-quill'), { ssr: false });


export default function AddNewPost({
  c, t, s
}: {
  c: string | null | undefined,
  t: string | null | undefined,
  s: string | null | undefined,
}) {
  const [content, setContent] = useState(c || "")
  const [title, setTitle] = useState(t || "");
  const [summary, setSummary] = useState(s || "");

  const router = useRouter();

  const quillModules = {
    toolbar: [
      [{ 'font': [] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
      ['link'],
      [{ align: [] }],
      [{ background: [] }],
      ['code-block'],
      ['clean'],
    ],
  };


  const quillFormats = [
    'font',
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    // 'image',
    'align',
    'background',
    'code-block',
  ];


  const handleEditorChange = (newContent) => {
    setContent(newContent);
    console.log(newContent)
  };

  const handleTitleChange = (title) => {
    setTitle(title.target.value);
  }

  const handleSummaryChange = (summary) => {
    setSummary(summary.target.value);
  }
  const demohandler = async () => {
    if (title === "" || content === "") {
      toast.error("Empty fields not allowed");
      return;
    }
    const res = await addPost({ title: title, body: content, summary: summary });
    if (res.success) {
      toast.success("New Post added");
      setTitle("");
      setContent("");
      setSummary("");
      router.push("/blogs/" + res.message);
    }
    else {
      toast.error(res.message)
    }
  }


  return (
    <div className="h-full w-full">
      <h1 className="text-4xl font-bold">Create a new Post</h1>

      <form action="" className='mt-20'>
        <div>
          <p className='text-xl mb-2'>Title</p>
          <div className="mt-2">
            <input id="title" name="title" type="text" onChange={handleTitleChange} value={title} required className="px-3 border-0 ring-1 ring-[#333333] focus:ring-[#666666] focus:outline-none focus:ring-2 hover:ring-2  text-white w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 bg-transparent focus:bg-transparent h-12" />
          </div>
        </div>
        <div>
          <p className='text-xl mt-6 mb-2'>Summary</p>
          <div className="mt-2">
            <input id="summary" name="summary" type="text" onChange={handleSummaryChange} value={summary} required className="px-3 border-0 ring-1 ring-[#333333] focus:ring-[#666666] focus:outline-none focus:ring-2 hover:ring-2  text-white w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 bg-transparent focus:bg-transparent h-12" />
          </div>
        </div>
      </form>
      <p className='text-2xl mt-10'>Content</p>
      <div className="h-full w-full">
        <QuillEditor
          value={content}
          onChange={handleEditorChange}
          modules={quillModules}
          formats={quillFormats}
          className="w-full h-[700px] bg-black text-white mb-20"
        />
      </div>
      <button onClick={demohandler} className="ring-2 ring-[#444444] px-4 py-2 rounded bg-white  text-black ">Post</button>
    </div>
  );
}