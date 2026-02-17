"use server";

import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";
import { log } from "node:console";

export async function getUserToken() {
  const x = (await cookies()).get("next-auth.session-token")?.value;
  const accessToken = await decode({
    token: x,
    secret: process.env.NEXTAUTH_SECRET!,
  });
// console.log(accessToken?.accessToken);
  
  return accessToken?.accessToken;
}
export async function getUserId() {
  const cookieStore = await cookies();
  const tokenValue =
    cookieStore.get("next-auth.session-token")?.value ??
    cookieStore.get("__Secure-next-auth.session-token")?.value;

  if (!tokenValue) return null;

  const decoded = await decode({
    token: tokenValue,
    secret: process.env.NEXTAUTH_SECRET!,
  });

  return decoded?.sub as string | null;
}
