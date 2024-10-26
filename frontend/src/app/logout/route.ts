import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
  const cookieStorage = cookies()
  const token = cookieStorage.get("token");

  if(token !== undefined) {
    cookieStorage.delete("token")
  }

  return NextResponse.json({"success": true});
}