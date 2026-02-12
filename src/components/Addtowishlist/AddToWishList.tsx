"use client";
import React, { useContext, useState } from "react";
import { Button } from "../ui/button";
import { HeartIcon, Loader } from "lucide-react";
import toast from "react-hot-toast";
import { wishlistContext } from "../context/wishListContext";
import { addToWishlistAction } from "@/app/(pages)/products/_action/addToWishList.action";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { getUserToken } from "@/app/(pages)/Helpers/getUserToken";

type AddToWishlistProps = {
  productId: string;
};

export default function AddToWishlist({ productId }: AddToWishlistProps) {
  const { getWishlist } = useContext(wishlistContext);
  const [isWishlistLoading, setIsWishlistLoading] = useState(false);

  const session = useSession();
  const router = useRouter();

  // Add product to wishlist
  const handleAddToWishlist = async () => {
    if (session.status !== "authenticated") {
      router.push("/login");
      return;
    }

    setIsWishlistLoading(true);

    try {
      const token = await getUserToken();
      const data = await addToWishlistAction({ productId, token });

      if (data.status === "success") {
        toast.success("Product added to wishlist");
        await getWishlist();
      } else {
        toast.error("Failed to add to wishlist");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    } finally {
      setIsWishlistLoading(false);
    }
  };

  return (
    <Button
      onClick={handleAddToWishlist}
      variant="outline"
      className="w-12 flex justify-center items-center"
    >
      {isWishlistLoading ? <Loader className="animate-spin" /> : <HeartIcon />}
    </Button>
  );
}
