import Link from "next/link";
import AllPosts from "./components/AllPosts";

export default async function AdminDashboard() {
  async function getAllPosts() {
    const res = await fetch("http://localhost:4000/blog");
    const allPosts = await res.json();
    return allPosts;
  }

  const allPosts = await getAllPosts();
  allPosts.reverse();

  return (
    <div>
      <Link href="/admin/post" className="flex justify-center text-gray-400 py-7 px-4 border-2 border-[#333333] border-dotted rounded m-2 hover:border-[#666666] hover:text-gray-200 hover:bg-[#111111]">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 25 25" strokeWidth="1.5" stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>

        New
      </Link>
      <h1 className="m-5 mt-10 text-xl">All Posts</h1>
      {allPosts.map((post) => < AllPosts key={post.id} id={post.id} summary={post.summary} title={post.title} date={new Date(post.published)} />)}
    </div>
  )
}