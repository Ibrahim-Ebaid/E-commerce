"use client";
import { getUserToken } from "@/app/(pages)/Helpers/getUserToken";
import { WishlistResponse } from "@/interfaces/wishList";
import { ReactNode, createContext, useState, useEffect } from "react";

export const wishlistContext = createContext<{
  wishlistData: WishlistResponse | null;
  setWishlistData: (value: WishlistResponse | null) => void;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  getWishlist: () => void;
}>({
  wishlistData: null,
  setWishlistData: () => {},
  isLoading: false,
  setIsLoading: () => {},
  getWishlist: () => {},
});

export async function addToWishlistAction({
  productId,
  token,
}: {
  productId: string;
  token: string;
}) {
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/wishlist`,
    {
      method: "POST",
      headers: {
        token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId }),
    }
  );
  const data = await response.json();
  return data;
}

export default function WishlistContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [wishlistData, setWishlistData] = useState<WishlistResponse | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);

  async function getWishlist() {
    setIsLoading(true);
    const token = await getUserToken();
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/wishlist",
      { headers: { token } }
    );
    const data: WishlistResponse = await response.json();
    // Normalize data to have `products` array
    setWishlistData({ ...data, products: data.data || [] });
    setIsLoading(false);
  }

  useEffect(() => {
    getWishlist();
  }, []);

  return (
    <wishlistContext.Provider
      value={{ wishlistData, setWishlistData, isLoading, setIsLoading, getWishlist }}
    >
      {children}
    </wishlistContext.Provider>
  );
}
