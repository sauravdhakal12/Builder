"use server"

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function handleLogout() {
  const cookieStorage = cookies()
  try {
    if (cookieStorage.get("token")?.value) {
      cookieStorage.delete("token");
    }

    revalidatePath("/blogs/[slug]");
    return { success: true }
  }
  catch (err) {
    return { sucess: false }
  }
}