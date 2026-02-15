"use client";
import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { wishlistContext } from "../context/wishListContext";
import { Loader, Trash2 } from "lucide-react";
import Link from "next/link";

type WishlistSummaryProps = {
  clearWishlist: () => void;
  isClearing: boolean;
};

export default function WishlistSummary({
  clearWishlist,
  isClearing,
}: WishlistSummaryProps) {
  const { wishlistData } = useContext(wishlistContext);

  const totalItems = wishlistData?.products.length || 0;

  return (
    <div className="flex flex-col gap-3 ">
      <div className="border rounded-xl p-6 h-fit">
        <h2 className="text-xl font-bold mb-4">Wishlist Summary</h2>
        <div className="flex justify-between mb-2 font-semibold">
          <span >Total Items :</span>
          <span >{totalItems} items</span>
        </div>

        <hr className="mb-4" />

        <Link href={"/products"}>
          <Button variant="outline" className="w-full mb-4 bg-blue-600 hover:bg-blue-700 text-white hover:text-white cursor-pointer">
            Continue Shopping
          </Button>
        </Link>
      </div>

      <div className="border-2 rounded-xl p-3 w-fit font-semibold border-red-500 text-red-500 hover:bg-red-500 hover:text-white">
        <span
          onClick={clearWishlist}
          className="flex items-center gap-2   text-sm"
        >
          {isClearing ? <Loader className="animate-spin" /> : <Trash2 size={17} />}
          Clear Wishlist
        </span>
      </div>
    </div>
  );
}
