import Link from "next/link";
import "./style.css"

export default async function PostPage({ params }: { params: { id: string } }) {
  const res = await fetch("http://localhost:4000/blog/" + params.id);

  const post = (await res.json())[0];

  if (!post || post.length === 0) {
    return <h1 className="text-4xl text-center"><span className="font-bold text-6xl">404</span> <br /> Not Found</h1>;
  }

  const date = new Date(post.published);

  const year = date.getFullYear();
  const month = date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth();
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();

  const readTime = Math.round(post.body.length / 1600);


  return (
    <div className="ring-0 lg:ring-1 ring-[#202020] w-full h-full text-white">
      <div className="border-dotted border-b-2 border-[#222222] pb-4 p-4 lg:p-20">
        <Link href="/blogs" className="hidden lg:flex md:flex  items-center font-bold text-blue-600 hover:underline">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23 23" fill="currentColor" className="size-5 text-blue-600">
            <path fillRule="evenodd" d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
          </svg>
          Blogs
        </Link>
        <p className="text-center text-gray-400">
          Category
        </p>
        <h1 className="font-bold text-center text-5xl lg:text-6xl pb-0 p-6">
          {post.title}
        </h1>
        <p className="flex items-center gap-1 justify-center mt-8 mb-4 text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22" fill="currentColor" className="size-5">
            <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-5.5-2.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0ZM10 12a5.99 5.99 0 0 0-4.793 2.39A6.483 6.483 0 0 0 10 16.5a6.483 6.483 0 0 0 4.793-2.11A5.99 5.99 0 0 0 10 12Z" clipRule="evenodd" />
          </svg>
          <span className="font-bold">Admin</span>
        </p>
        <div className="text-sm text-gray-400 flex flex-row justify-between">
          <span className="flex gap-1 items-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23 23" fill="currentColor" className="size-5">
              <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-13a.75.75 0 0 0-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 0 0 0-1.5h-3.25V5Z" clipRule="evenodd" />
            </svg>
            {readTime === 0 ? 1 : readTime} min
          </span>
          <span className="flex gap-1 items-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23 23" fill="currentColor" className="size-5">
              <path d="M5.25 12a.75.75 0 0 1 .75-.75h.01a.75.75 0 0 1 .75.75v.01a.75.75 0 0 1-.75.75H6a.75.75 0 0 1-.75-.75V12ZM6 13.25a.75.75 0 0 0-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 0 0 .75-.75V14a.75.75 0 0 0-.75-.75H6ZM7.25 12a.75.75 0 0 1 .75-.75h.01a.75.75 0 0 1 .75.75v.01a.75.75 0 0 1-.75.75H8a.75.75 0 0 1-.75-.75V12ZM8 13.25a.75.75 0 0 0-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 0 0 .75-.75V14a.75.75 0 0 0-.75-.75H8ZM9.25 10a.75.75 0 0 1 .75-.75h.01a.75.75 0 0 1 .75.75v.01a.75.75 0 0 1-.75.75H10a.75.75 0 0 1-.75-.75V10ZM10 11.25a.75.75 0 0 0-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 0 0 .75-.75V12a.75.75 0 0 0-.75-.75H10ZM9.25 14a.75.75 0 0 1 .75-.75h.01a.75.75 0 0 1 .75.75v.01a.75.75 0 0 1-.75.75H10a.75.75 0 0 1-.75-.75V14ZM12 9.25a.75.75 0 0 0-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 0 0 .75-.75V10a.75.75 0 0 0-.75-.75H12ZM11.25 12a.75.75 0 0 1 .75-.75h.01a.75.75 0 0 1 .75.75v.01a.75.75 0 0 1-.75.75H12a.75.75 0 0 1-.75-.75V12ZM12 13.25a.75.75 0 0 0-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 0 0 .75-.75V14a.75.75 0 0 0-.75-.75H12ZM13.25 10a.75.75 0 0 1 .75-.75h.01a.75.75 0 0 1 .75.75v.01a.75.75 0 0 1-.75.75H14a.75.75 0 0 1-.75-.75V10ZM14 11.25a.75.75 0 0 0-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 0 0 .75-.75V12a.75.75 0 0 0-.75-.75H14Z" />
              <path fillRule="evenodd" d="M5.75 2a.75.75 0 0 1 .75.75V4h7V2.75a.75.75 0 0 1 1.5 0V4h.25A2.75 2.75 0 0 1 18 6.75v8.5A2.75 2.75 0 0 1 15.25 18H4.75A2.75 2.75 0 0 1 2 15.25v-8.5A2.75 2.75 0 0 1 4.75 4H5V2.75A.75.75 0 0 1 5.75 2Zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75Z" clipRule="evenodd" />
            </svg>
            {year}-{month}-{day}
          </span>
        </div>
      </div>
      <div className="text-gray-200 text-lg mt-5 pt-4 p-5 lg:p-20 md:p-10">
        {/* <p dangerouslySetInnerHTML={{ __html: post.body }} className="leading-7"> */}
        {/* {post.body} */}
        {/* </p> */}
        {/* <p className="prose prose-[#ffffff]" dangerouslySetInnerHTML={{ __html: post.body }}></p> */}
        <article
          className="prose max-w-none prose-blockquote:bg-gray-800 prose-blockquote:p-4 prose-pre:bg-gray-800 prose-a:text-blue-400 dark:prose-invert text-slate-600 dark:text-gray-300 "

          // className="max-w-none prose 
          //   text-gray-300 prose-p:text-gray-300 prose-headings:text-gray-300
          //   prose-li:text-gray-300 prose-strong:text-gray-300"
          dangerouslySetInnerHTML={{ __html: post.body }}></article>
      </div>
    </div >
  )
}