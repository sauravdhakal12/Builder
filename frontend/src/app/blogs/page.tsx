import Link from "next/link";

function Post({
  id,
  title,
  body,
  date,
}: {
  id: string
  title: string,
  body: string,
  date: Date,
}) {
  const year = date.getFullYear();
  const month = date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth();
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();

  const link = `/blogs/${id}`

  return (
    <Link href={link} className="flex justify-between flex-col gap-4 border-2 hover:z-10 border-[#333333] border-dotted  p-16 h-[27rem] hover:scale-105 lg:hover:scale-110 bg-[#040404] duration-200 ease-in-out text-white">
      <div className="flex flex-col gap-4">
        <p className="text-gray-400 text-sm">{year}-{month}-{day}</p>
        <div className="text-2xl">
          <h1 className="line-clamp-3 font-bold leading-7">
            {title}
          </h1>
        </div>
        <div className="text-gray-400">
          <p className="line-clamp-6 leading-5">
            {body}
          </p>
        </div>
      </div>
      <div className="flex items-center text-gray-500 text-sm">Read More
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
          <path fillRule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
        </svg>


      </div>
    </Link>
  )
}
export default async function BlogPage() {
  const res = await fetch("http://localhost:4000/blog", {
    cache: "no-cache",
  });
  const allPosts = await res.json();
  allPosts.reverse();
  return (
    <div>
      <div>
        {allPosts.length === 0 ?

          <div className="mt-5 mb-10 text-center">
            <h1 className="text-4xl font-bold">No Blogs Found</h1>
          </div> :

          <div className="mt-5 mb-10 text-center">
            <h1 className="text-4xl font-bold">Blogs</h1>
            <p>Latest Blogs from Builders Academy</p>
          </div>
        }
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mx-6 lg:gap-3 ">
          {allPosts.map((post) => (
            <Post key={post.id} id={post.id} title={post.title} body={post.summary} date={new Date(post.published)} />
          ))}
        </div>
      </div>
    </div>
  )
}