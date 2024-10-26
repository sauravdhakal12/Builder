"use client"

import { useRouter } from "next/navigation";
import { loginUser, loginRedirect, registerUser, registerRedirect } from "./actions"
import { useState } from "react";
import toast from "react-hot-toast";

export default function LoginForm() {
  const [loginState, setLoginState] = useState("Login");
  const router = useRouter();

  async function loginUserHandler(formData: FormData) {

    // If user is loggin in
    if (loginState === "Login") {
      if ((formData.get("password")?.toString().length || 6) < 6) {
        toast.error("Invalid email / password");
        return;
      }
      const res = await loginUser(formData);
      if (!(res.success)) {
        toast.error(res?.message);
      }
      else {
        toast.success("Logged In");
        loginRedirect();
      }
    }

    // If user is registering
    else {
      if ((formData.get("password")?.toString().length || 6) < 6) {
        toast.error("Password must be atleast 6 characters");
        return;
      }
      else if ((formData.get("password")?.toString() !== formData.get("cpassword")?.toString())) {
        toast.error("Password and confirm password donot match");
        return;
      }
      const res = await registerUser(formData);
      if (!(res.success)) {
        toast.error(res?.message);
      }
      else {
        toast.success("Successfully registered. Now login.");
        registerRedirect();
      }

    }

    formData.set("password", "");
    formData.set("cpassword", "");
  }

  return (
    <form className="space-y-6" id="demo123" action={loginUserHandler}>
      <div>
        <div className="mt-2">
          <input id="email" name="email" type="email" autoComplete="email" placeholder="Email" required className="px-3 border-0 ring-1 ring-[#333333] focus:ring-[#666666] focus:outline-none focus:ring-2 hover:ring-2  text-white w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 bg-transparent focus:bg-transparent h-12" />
        </div>
      </div>

      <div>
        <div className="text-sm mt-2 text-right">
          <a href="#" className="font-bold text-blue-500 hover:text-blue-400">Forgot password?</a>
        </div>
        <div className="mt-2">
          <input id="password" name="password" type="password" placeholder="Password" autoComplete="current-password" required className="px-3 border-0 ring-1 ring-[#333333] focus:ring-[#666666] focus:outline-none focus:ring-2 hover:ring-2  text-white w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 bg-transparent h-12" />
        </div>
      </div>

      {loginState === "Register" ?
        <div>
          <div className="mt-2">
            <input id="cpassword" name="cpassword" type="password" placeholder="Confirm Password" required className="px-3 border-0 ring-1 ring-[#333333] focus:ring-[#666666] focus:outline-none focus:ring-2 hover:ring-2  text-white w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 bg-transparent focus:bg-transparent h-12" />
          </div>
        </div>
        : ""}

      <button type="submit" className=" flex w-full justify-center rounded-md  bg-gray-100 text-black  px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">{loginState}</button>

      <div className="text-center cursor-pointer" onClick={() => setLoginState(loginState === "Login" ? "Register" : "Login")}>
        {loginState === "Login" ? "New Account? " : "Back to "}
        {loginState === "Login" ?
          (<span className="text-blue-500 font-bold">Register</span>)
          : (<span className="text-blue-500 font-bold">Login</span>)
        }
      </div>
    </form>
  )
}