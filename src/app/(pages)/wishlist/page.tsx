"use client";

import React, { useContext, useEffect, useState } from "react";
import { wishlistContext } from "@/components/context/wishListContext";
import WishlistItem from "@/components/wishlist/wishlistItem";
import WishlistSummary from "@/components/wishlist/wishlisttSummary";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import toast from "react-hot-toast";
import { getUserToken } from "../../../app/(pages)/Helpers/getUserToken";

export default function Wishlist() {
  const { wishlistData, isLoading, setWishlistData, getWishlist } =
    useContext(wishlistContext);

  const [removingId, setRemovingId] = useState<string | null>(null);
  const [isClearing, setIsClearing] = useState(false);

  // fetch once
  useEffect(() => {
    getWishlist();
  }, []);

  const products = wishlistData?.products ?? [];

  async function removeWishlistItem(productId: string) {
    try {
      setRemovingId(productId);
      const token = await getUserToken();

      const res = await fetch(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
        {
          method: "DELETE",
          headers: { token },
        }
      );

      const result = await res.json();

      // ✅ IDs returned from backend
      const remainingIds: string[] = result.data;

      // ✅ filter locally (FAST)
      const updatedProducts = products.filter((p: any) =>
        remainingIds.includes(p._id)
      );

      setWishlistData({
        ...wishlistData,
        products: updatedProducts,
        totalItems: updatedProducts.length,
      });

      toast.success("Product removed from wishlist");
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setRemovingId(null);
    }
  }

  async function clearWishlist() {
    try {
      setIsClearing(true);
      const token = await getUserToken();

      await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
        method: "DELETE",
        headers: { token },
      });

      setWishlistData({
        ...wishlistData,
        products: [],
        totalItems: 0,
      });

      toast.success("Wishlist cleared");
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setIsClearing(false);
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader className="animate-spin" size={48} />
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[75vh] gap-2">
        <h2>Your Wishlist is Empty 😥</h2>
        <Link href="/products">
          <Button>Add Products</Button>
        </Link>
      </div>
    );
  }

  return (
    <section className="container mx-auto py-10 ">
      <div className="flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold mb-2">My Wishlist</h1>
      <p className="text-muted-foreground mb-8">
        <span className="font-bold text-blue-600">{products.length} </span>items in your wishlist
      </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT */}
        <div className="lg:col-span-2 space-y-4">
          {products.map((product: any) => (
            <WishlistItem
              key={product._id}
              product={product}
              removeWishlistItem={removeWishlistItem}
              removingId={removingId}
            />
          ))}
        </div>

        {/* RIGHT */}
        <WishlistSummary
          clearWishlist={clearWishlist}
          isClearing={isClearing}
        />
      </div>
    </section>
  );
}
