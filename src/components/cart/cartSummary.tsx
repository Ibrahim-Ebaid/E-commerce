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
      <div className="flex flex-col gap-3 ">
        <div className="border rounded-xl p-6 h-fit  ">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>

          <div className="flex justify-between mb-2 ">
            <span>Subtotal : {cartData?.numOfCartItems} items</span>
            <span className="font-semibold">
              {cartData?.data.totalCartPrice} EGP
            </span>
          </div>

          <div className="flex justify-between mb-4 ">
            <span>Shipping</span>
            <span className="text-green-600">Free</span>
          </div>

          <hr className="mb-4" />

          <div className="flex justify-between text-lg font-bold mb-6">
            <span>Total</span>
            <span>{cartData?.data.totalCartPrice} EGP</span>
          </div>

          <CheckOut cartId={cartData?.cartId!}/>
          <Link href={"/products"}>
            {" "}
            <Button variant="outline" className="w-full mb-4">
              Continue Shopping
            </Button>
          </Link>
        </div>
        <div className="border rounded-xl p-3 w-fit border-red-500 ">
          {" "}
          <button
            onClick={clearCart}
            className="flex items-center gap-2 text-red-500 text-sm "
          >
            {isClearing ? (
              <Loader className="animate-spin" />
            ) : (
              <Trash2 size={16} />
            )}
            Clear Cart
          </button>
        </div>
      </div>
    </>
  );
}
