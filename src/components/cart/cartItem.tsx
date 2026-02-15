"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Loader, Minus, Plus } from "lucide-react";
import { useContext } from "react";
import { cartContext } from "../context/cartContext";
type CartItemProps = {
  removeCartItem: (productId: string) => void;
  removingId: string | null;
  updateCartItem: (productId: string, count: number) => Promise<void>;
  updateId: string | null;
};

export default function CartItem({
  removeCartItem,
  removingId,
  updateCartItem,
  updateId,
}: CartItemProps) {
  const { cartData, isLoading } = useContext(cartContext);

  return (
    <>
      <div className="space-y-4">
        {cartData?.data.products.map((item) => (
          <div
            key={item._id}
            className="flex items-center justify-between border rounded-xl p-4"
          >
            {/* left */}
            <div className="flex gap-4">
              <Image
                src={item.product.imageCover}
                width={120}
                height={120}
                alt={item.product.title}
                className="rounded-lg"
              />

              <div>
                <p className="text-sm text-muted-foreground">
                  {item.product.brand.name}
                </p>
                <h3 className="font-semibold text-lg">{item.product.title}</h3>
                <p>{item.product.category.name}</p>

                <div className="flex items-center gap-2 mt-3">
                  <Button className="hover:text-white hover:bg-red-500"
                    onClick={() =>
                      updateCartItem(item.product._id, item.count - 1)
                    }
                    size="icon"
                    variant="outline"
                  >
                    <Minus size={16} />
                  </Button>
                  <span className="font-semibold">{updateId==item.product.id?<Loader className="animate-spin text-yellow-400" />:item.count}</span>
                  <Button
                   className="hover:text-white hover:bg-blue-600"
                    onClick={() =>
                      updateCartItem(item.product._id, item.count + 1)
                    }
                    size="icon"
                    variant="outline"
                  >
                    <Plus size={16} />
                  </Button>
                </div>
              </div>
            </div>

            {/* right */}
            <div className="text-right">
              <p className="font-bold text-lg">{item.price} EGP</p>
              <div className="flex justify-between items-center gap-2 ">
                {removingId == item.product._id && (
                  <Loader className="animate-spin text-red-500"/>
                )}

                <Button
                  onClick={() => removeCartItem(item.product._id)}
                   className="border-2 mt-2 rounded-xl p-3 w-fit font-semibold bg-white border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                >
                  Remove
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
