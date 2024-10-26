"use client"

import Link from "next/link";
import { handleLogout } from "./actions";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

export function AdminCookieHeader() {
  const router = useRouter();
  const path = usePathname();

  // For logout
  async function logoutHandler() {
    const res = await handleLogout();
    if (res.success) {
      toast.success("Loggedout");

      const rootPath = path.split("/")[1];
      if (rootPath === "admin") {
        router.push("/admin");
      }else {
        router.refresh();
      }
    }
    else {
      toast.error("Something went wrong");
    }
  }

  return (
    <div className="flex items-center">
      <Link href={"/admin/post"} className="relative group">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 22 22" strokeWidth="1.5" stroke="currentColor" className="size-6 mr-4 text-gray-200 hover:text-gray-400">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
        <span className="group-hover:opacity-100 transition-opacity delay-300 duraition-300 ease-in-out bg-[#111111] w-24 text-center ring-2 ring-[#333333] px-3 text-sm text-gray-100 rounded-md absolute left-1/2 -translate-x-1/2 translate-y-1/4 opacity-0 mx-auto">
          New Post
        </span>
      </Link>

      <Link href="/admin/dashboard" className="mr-4 self-end bg-white text-black font-[700] px-4 py-2 rounded-md text-sm hover:bg-[#aaaaaa] duration-300 ease-in-out">
        Dashboard
      </Link>
      <span onClick={logoutHandler} className="hover:cursor-pointer self-end text-white font-[700] px-4 py-2 text-sm hover:text-gray-400 duration-300 ease-in-out">
        Logout
      </span>
    </div>
  )
}

export function NonAdminCookieHeader() {
  return (
    <div>
      <Link href="/" className="mr-4 self-end bg-white text-black font-[700] px-4 py-2 rounded-md text-sm hover:bg-[#aaaaaa] duration-300 ease-in-out"  >Join the Community</Link>
    </div>
  )
}