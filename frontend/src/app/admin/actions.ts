"use server"

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginRedirect(){
  redirect("/admin/dashboard");
}
export async function registerRedirect(){
  redirect("/admin");
}

export async function loginUser(formData: FormData) {
  try {
    const res = await fetch("http://localhost:4000/user/login", {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ "email": formData.get("email"), "password": formData.get("password") }),
    });
    const a = await res.json()

    if(a.success) {
      cookies().set("token", a.token);
    }
    return a;
  }
  catch (err) {
    console.log(err);
  }
}

export async function registerUser(formData: FormData) {
  try {
    const res = await fetch("http://localhost:4000/user/register", {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ "email": formData.get("email"), "password": formData.get("password") }),
    });
    const a = await res.json()
    console.log(a);

    if(a.success) {
      cookies().set("token", a.token);
    }
    return a;
  }
  catch (err) {
    console.log(err);
  }
}