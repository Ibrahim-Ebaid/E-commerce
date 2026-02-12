"use client";
import React, { useContext, useState } from "react";

import CartSummary from "@/components/cart/cartSummary";
import { cartContext } from "@/components/context/cartContext";
import { CartResponse } from "@/interfaces";
import CartItem from "@/components/cart/cartItem";
import toast from "react-hot-toast";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { getUserToken } from "../Helpers/getUserToken";

export default function Cart() {
  const { cartData, isLoading, setCartData, getCart } = useContext(cartContext);
  const [removingId, setRemovingId] = useState<null | string>(null);
  const [updateId, setUpdateId] = useState<null | string>(null);
  const [isClearing, setIsClearing] = useState<boolean>(false);

  if (
    cartData == null ||
    typeof cartData?.data?.products[0]?.product === "string"
  ) {
    getCart();
  }

  async function removeCartItem(productId: string) {
    setRemovingId(productId);
    const token = await getUserToken()
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/cart/" + productId,
      {
        method: "DELETE",
        headers: {
          token: token,
        },
      }
    );
    const data: CartResponse = await response.json();
    console.log(data);
    if (data.status == "success") {
      setCartData(data);
      toast.success("Product Deleted successfuly");
    }
    setRemovingId(null);
  }

  async function updateCartItem(productId: string, count: number) {
    if (count == 0) {
      removeCartItem(productId);
    }
    setUpdateId(productId);
    const token = await getUserToken()
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/cart/" + productId,
      {
        method: "PUT",
        body: JSON.stringify({ count }),
        headers: {
          token: token,
          "Content-Type": "application/json",
        },
      }
    );
    const data: CartResponse = await response.json();
    console.log(data);
    if (data.status == "success") {
      setCartData(data);
    }
    if (count >= 1) {
      toast.success("Product is Updated successfuly");
    }
    setUpdateId(null);
  }

  async function clearCart() {
    setIsClearing(true);
    const token = await getUserToken();
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/cart",
      {
        method: "DELETE",
        headers: {
          token: token,
        },
      }
    );
    const data: CartResponse = await response.json();
    console.log(data);
    if (data.message == "success") {
      setCartData(null);
      toast.success("Your Cart is Cleared");
    }
    setIsClearing(false);
  }

  return (
    <>
      {isLoading || typeof cartData?.data?.products[0]?.product == "string" ? (
        <Loader className="animate-spin" />
      ) : cartData && cartData.numOfCartItems > 0 ? (
        <section className="container mx-auto py-10">
          <h1 className="text-3xl font-bold mb-2">Shopping Cart</h1>
          <p className="text-muted-foreground mb-8">
            {cartData?.numOfCartItems} items in your cart
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left */}
            <div className="lg:col-span-2">
              <CartItem
                removeCartItem={removeCartItem}
                removingId={removingId}
                updateCartItem={updateCartItem}
                updateId={updateId}
              />
            </div>

            {/* Right */}
            <CartSummary clearCart={clearCart} isClearing={isClearing} />
          </div>
        </section>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[75vh] gap-2">
          <h2>Your Cart is Empty....😥</h2>
          <Link href={"/products"}>
            <Button>Add Products to Cart</Button>
          </Link>
        </div>
      )}
    </>
  );
}
