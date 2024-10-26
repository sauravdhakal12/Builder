"use server"

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function addPost({ title, body, summary }: { title: string, body: string, summary: string }) {
  const cookieStorage = cookies();
  const token = cookieStorage.get("token")?.value;

  if(!token){
    return { success: false, message: "Something went wrong" }
  }

  try {
    const res = await fetch("http://localhost:4000/blog/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token,
      },
      body: JSON.stringify({
        title,
        body,
        summary,
      }),
    });
    const data = await res.json();
    if (data.success) {
      revalidatePath("/blogs");
      revalidatePath("/admin/dashboard");
    }
    return data;
  }
  catch (err) {
    return { success: false, message: "Something went wrong" }
  }
}
