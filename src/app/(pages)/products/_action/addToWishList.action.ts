"use server";

import { getUserToken } from "../../Helpers/getUserToken";

export async function addToWishlistAction({ productId }: { productId: string }) {
  const token = await getUserToken();

  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/wishlist`,
    {
      method: "POST",
      headers: {
        token: token,
        "Content-Type": "application/json", // important for JSON body
      },
      body: JSON.stringify({ productId }), // send productId in the body
    }
  );

  const data = await response.json();
  return data;
}
