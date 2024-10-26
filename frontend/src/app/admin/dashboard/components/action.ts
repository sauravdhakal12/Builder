"use server"

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function deletePost(id: string) {
  const cookieStorage = cookies();
  const token = cookieStorage.get("token")?.value;

  if(!token) {
    return {success: false, message: "Unauthorized"}
  }
  const res = await fetch(`http://localhost:4000/blog/${id}`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Authorization": token
    }
  });
  const data = await res.json();
  if (data.success) {
    revalidatePath("/admin/dashboard");
  }
  return data;
}