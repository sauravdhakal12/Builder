import Link from "next/link";
import MenuBar from "./menu";
import { cookies } from "next/headers";
import { AdminCookieHeader, NonAdminCookieHeader } from "./CookieHeader";

export default function Header() {

  // Check if user is logged in
  const cookieStorage = cookies();
  const token = cookieStorage.get("token");

  return (
    <div className="sticky top-0 z-20">
      <header className="flex items-center ring-1 ring-[#202020] bg-[#040404] rounded-lg py-2 px-10">
        
        {/* Logo */}
        <Link href="/" className="bg-black p-2 border-2 rounded-lg border-0 border-[#222222] mr-10 flex-none w-14">
          <p className="font-bold text-2xl bg-white bg-[radial-gradient(100%_100%_at_top_left,white,white,rgb(74,32,138,.5))] text-transparent bg-clip-text text-center">
            BA
          </p>
        </Link>

        <div className="flex-auto w-26" >
          <div className="flex gap-0 justify-between items-center"></div>

          {/* Menu Bar */}
          <MenuBar />
        </div>

        {/* Dashboard or Join */}
        <div className="hidden lg:block">
          {token?.value ?
            <AdminCookieHeader /> : <NonAdminCookieHeader />
          }
        </div>
      </header>
    </div>
  )
}