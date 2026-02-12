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
        <div className="flex justify-between mb-2 ">
          <span>Total Items:</span>
          <span className="font-semibold">{totalItems} items</span>
        </div>

        <hr className="mb-4" />

        <Link href={"/products"}>
          <Button variant="outline" className="w-full mb-4">
            Continue Shopping
          </Button>
        </Link>
      </div>

      <div className="border rounded-xl p-3 w-fit border-red-500">
        <button
          onClick={clearWishlist}
          className="flex items-center gap-2 text-red-500 text-sm"
        >
          {isClearing ? <Loader className="animate-spin" /> : <Trash2 size={16} />}
          Clear Wishlist
        </button>
      </div>
    </div>
  );
}
