"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

// Menues
const urlPaths = [
  {
    "href": "/programs",
    "name": "Programs"
  },
  {
    "href": "/blogs",
    "name": "Blogs"
  },
  {
    "href": "/careers",
    "name": "Careers"
  }
];

export default function MenuBar() {
  const path = usePathname();

  const classes = "py-1.5 px-4 rounded-full text-sm  hover:text-blue-400 duration-300 ease-in-out text-gray-400"
  const activeClass = "font-bold text-blue-400 " + classes.slice(0, -13);

  return (

    <div>
      {urlPaths.map((urlPath) => (
        <Link href={urlPath.href} key={urlPath.name} className={path.split("/")[1] === urlPath.href.slice(1,) ? activeClass : classes}>
          {urlPath.name}
        </Link>
      ))}
    </div>

  )
} 