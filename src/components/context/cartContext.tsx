"use client";
import { getUserToken } from "@/app/(pages)/Helpers/getUserToken";
import { CartResponse } from "@/interfaces";
import { createContext, ReactNode, useEffect, useState } from "react";

export const cartContext = createContext<{
  cartData: CartResponse | null;
  setCartData: (value: CartResponse | null) => void;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  getCart: () => void;
}>({
  cartData: null,
  setCartData: () => {},
  isLoading: false,
  setIsLoading: () => {},
  getCart: () => {},
});

export default function CartContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [cartData, setCartData] = useState<CartResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function getCart() {  
    setIsLoading(true);
    const token = await getUserToken();
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/cart",
      {
        headers: { token: token },
      }
    );
    const data: CartResponse = await response.json();
    setCartData(data);
    console.log(data);
    setIsLoading(false);
  }
  useEffect(() => {
    async function fetchCart() {
      await getCart();
    }

    fetchCart();
  }, []);

  return (
    <cartContext.Provider
      value={{ cartData, setCartData, isLoading, setIsLoading, getCart }}
    >
      {children}
    </cartContext.Provider>
  );
}
