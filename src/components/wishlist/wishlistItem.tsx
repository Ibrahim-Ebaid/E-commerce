"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";

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
    <div className="flex items-center gap-4 border rounded-lg p-4">
      <Image
        src={product.imageCover}
        alt={product.title}
        width={80}
        height={80}
        className="rounded"
      />

      <div className="flex-1">
        <h3 className="font-semibold">{product.title}</h3>
        <p className="text-muted-foreground">{product.price} EGP</p>
      </div>

      <Button
        variant="destructive"
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
  );
}
