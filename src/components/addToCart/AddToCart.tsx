"use client";
import React, { useContext, useState } from "react";
import { CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { HeartIcon, Loader, ShoppingCartIcon } from "lucide-react";
import toast from "react-hot-toast";
import { cartContext } from "../context/cartContext";
import { addToCartAction } from "@/app/(pages)/products/_action/addToCart.action";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ODc2Y2Q2ZGY3YTJjNTUyNTM5ZDE1MiIsIm5hbWUiOiJBaG1lZCBBYmQgQWwtTXV0aSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzcwNDgyOTAyLCJleHAiOjE3NzgyNTg5MDJ9.8GQI8tDvHyAxX3eW_OiGuFSDFyP6xT6-rE8283ciMTEeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ODc2Y2Q2ZGY3YTJjNTUyNTM5ZDE1MiIsIm5hbWUiOiJBaG1lZCBBYmQgQWwtTXV0aSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzcwNDgyOTAyLCJleHAiOjE3NzgyNTg5MDJ9.8GQI8tDvHyAxX3eW_OiGuFSDFyP6xT6-rE8283ciMTE
export default function AddToCart({ productId }: { productId: string }) {
  const { getCart, setCartData } = useContext(cartContext);

  const [isLoading, setIsLoading] = useState(false);
  const session = useSession();
  const router = useRouter()
  async function addProductToCart() {
    if (session.status == "authenticated") {
      setIsLoading(true);
      const data = await addToCartAction({ productId });
      data.status == "success" && toast.success("product add successfully");

      console.log(data);
      setCartData(data);
      await getCart();
      setIsLoading(false);
    }else{
      router.push('/login')
    }
  }
  return (
    <>
      <CardFooter className="gap-2">
        <Button onClick={addProductToCart} className="grow">
          {isLoading ? (
            <Loader className="animate-spin" />
          ) : (
            <ShoppingCartIcon />
          )}{" "}
          Add to Cart
        </Button>
        
        

      </CardFooter>
    </>
  );
}
