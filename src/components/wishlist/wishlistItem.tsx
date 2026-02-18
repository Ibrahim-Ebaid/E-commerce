"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import Link from "next/link";

interface Props {
  product: any;
  removeWishlistItem: (id: string) => void;
  removingId: string | null;
}

export default function WishlistItem({
  product,
  removeWishlistItem,
  removingId,
}: Props) {
  return (
    <>
      <div className="flex flex-col md:flex-row items-center md:justify-between gap-4 border rounded-lg p-4 w-full">
        <Link href={"/products/" + product.id} className="w-full md:w-auto">
          <div className="flex flex-col md:flex-row items-center gap-4 cursor-pointer w-full">
            <Image
              src={product.imageCover}
              alt={product.title}
              width={80}
              height={80}
              className="rounded mx-auto md:mx-0"
            />

            <div className="flex-1 text-center md:text-left mt-2 md:mt-0">
              <h3 className="font-semibold">{product.title}</h3>
              <p className="text-muted-foreground font-bold"><span className="text-blue-600">{product.price}</span> EGP</p>
            </div>
          </div>
        </Link>

        <div className="w-full md:w-auto mt-3 md:mt-0">
          <Button
            className="border-2 rounded-xl p-3 w-full md:w-fit font-semibold bg-white border-red-500 text-red-500 hover:bg-red-500 hover:text-white cursor-pointer"
            onClick={() => removeWishlistItem(product._id)}
            disabled={removingId === product._id}
          >
            {removingId === product._id ? (
              <Loader className="animate-spin" size={16} />
            ) : (
              "Remove"
            )}
          </Button>
        </div>
      </div>
    </>
  );
}
