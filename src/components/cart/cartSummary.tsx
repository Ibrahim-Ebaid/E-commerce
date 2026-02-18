import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { cartContext } from "../context/cartContext";
import { Loader, Trash2 } from "lucide-react";
import Link from "next/link";
import CheckOut from "../checkOut/checkOut";
type clearCartProps = {
  clearCart: () => void;
  isClearing: boolean;
};

export default function CartSummary({ clearCart, isClearing }: clearCartProps) {
  const { cartData, isLoading } = useContext(cartContext);

  return (
    <>
      <div className="flex flex-col gap-3 w-full md:w-96">
        <div className="border rounded-xl p-6 h-fit w-full">
          <h2 className="text-xl font-bold mb-4 text-center md:text-left">
            Order Summary
          </h2>

          <div className="flex flex-col sm:flex-row justify-between mb-2">
            <span>Subtotal : {cartData?.numOfCartItems} items</span>
            <span className="font-semibold mt-1 sm:mt-0">
              {cartData?.data.totalCartPrice} EGP
            </span>
          </div>

          <div className="flex flex-col sm:flex-row justify-between mb-4">
            <span>Shipping</span>
            <span className="text-green-600 mt-1 sm:mt-0">Free</span>
          </div>

          <hr className="mb-4" />

          <div className="flex flex-col sm:flex-row justify-between text-lg font-bold mb-6">
            <span>Total</span>
            <span>{cartData?.data.totalCartPrice} EGP</span>
          </div>

          <CheckOut cartId={cartData?.cartId!} />

          <Link href={"/products"}>
            <Button variant="outline" className="w-full mb-4 mt-4">
              Continue Shopping
            </Button>
          </Link>
        </div>

        <div className="border-2 rounded-xl p-3 w-full md:w-fit font-semibold bg-white border-red-500 text-red-500 hover:bg-red-500 hover:text-white">
          <button
            onClick={clearCart}
            className="flex items-center justify-center gap-2 text-sm cursor-pointer w-full"
          >
            {isClearing ? (
              <Loader className="animate-spin" />
            ) : (
              <Trash2 size={17} className="font-semibold" />
            )}
            Clear Cart
          </button>
        </div>
      </div>
    </>
  );
}
