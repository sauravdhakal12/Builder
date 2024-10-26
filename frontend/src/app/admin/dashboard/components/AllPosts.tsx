"use client"

import Link from "next/link";
import { deletePost } from "./action";
import toast from "react-hot-toast";

export default function AllPosts({
  id, title, summary, date
}: {
  id: string, title: string, summary: string, date: Date
}) {
  const links = `/blogs/${id}`

  const year = date.getFullYear();
  const month = date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth();
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();

  async function deletePostHandler(){
    const sure = confirm("Delete this post? ");
    if(!sure) return;
    const res = await deletePost(id);

    if(res.success) {
      toast.success("Successfully deleted post");
    }
    else {
      toast.error(res.message);
    }
  }

  return (
    <div className="ring-2 ring-[#333333] rounded flex justify-between hover:ring-[#444444] hover:bg-[#161616] m-2">
      <Link href={links} className="h-full w-full p-5 border-r-2 border-[#303030]">
        <p className="text-gray-600 text-sm">{year}-{month}-{day}</p>
        <h1 className="text-2xl mb-2">{title} </h1>
        <p className="text-gray-400">{summary}</p>
      </Link>
      <div className="flex p-5 items-center">
        <span onClick={deletePostHandler} className="relative group mr-2 cursor-pointer text-gray-300 hover:scale-110">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
          </svg>
          <span className="group-hover:opacity-100 transition-opacity bg-[#111111] ring-2 ring-[#333333] px-3 text-sm text-gray-100 rounded-md absolute left-1/2 -translate-x-1/2 translate-y-1/4 opacity-0 mx-auto">Delete</span>
        </span>
        {/* <span className="relative group ml-2 cursor-pointer  text-gray-300 hover:scale-110">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
          </svg>
          <span className="group-hover:opacity-100 transition-opacity bg-[#111111] ring-2 ring-[#333333] px-3 text-sm text-gray-100 rounded-md absolute left-1/2 -translate-x-1/2 translate-y-1/4 opacity-0 mx-auto">Edit</span>
        </span> */}
      </div>
    </div>
  )
}