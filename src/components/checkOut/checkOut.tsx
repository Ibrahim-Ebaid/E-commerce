import { getUserToken } from "@/app/(pages)/Helpers/getUserToken";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { getToken } from "next-auth/jwt";
import { useRef } from "react";
export default function CheckOut({ cartId }: { cartId: string }) {
  let detailsInput = useRef<HTMLInputElement | null>(null);
  let cityInput = useRef<HTMLInputElement | null>(null);
  let phoneInput = useRef<HTMLInputElement | null>(null);

  async function checkOutSession(cartId: string) {
    const shippingAddress = {
      details: detailsInput.current?.value,
      city: cityInput.current?.value,
      phone: phoneInput.current?.value,
    };
    const token = await getUserToken();
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
      {
        method: "POST",
        body: JSON.stringify({ shippingAddress }),
        headers: {
          token,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
    if (data.status == "success") {
      window.location.href = data.session.url;
    }
  }
  async function cashOrder(cartId: string) {
    const shippingAddress = {
      details: detailsInput.current?.value,
      city: cityInput.current?.value,
      phone: phoneInput.current?.value,
    };

    const token = await getUserToken();

    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
      {
        method: "POST",
        body: JSON.stringify({ shippingAddress }),
        headers: {
          token,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    console.log(data);

    // SUCCESS → redirect to all orders page
    if (data.status === "success") {
      window.location.href = "/allOrders";
    }
  }

  return (
    <>
      <Dialog>
        <form>
          <DialogTrigger asChild>
            <Button  className="w-full mb-3 bg-blue-700 hover:bg-blue-800">Proceed to Checkout</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-sm">
            <DialogHeader>
              <DialogTitle>Add Shipping Address</DialogTitle>
              <DialogDescription>
                Make Sure Your entered correct Address
              </DialogDescription>
            </DialogHeader>
            <div>
              <div>
                <Label className="py-1.5">City</Label>
                <Input id="city" ref={cityInput} />
              </div>
              <div>
                <Label className="py-1.5">Phone</Label>
                <Input id="phone" ref={phoneInput} />
              </div>
              <div>
                <Label className="py-1.5">Details</Label>
                <Input id="details" ref={detailsInput} />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button className="bg-red-600 hover:bg-red-700 text-white">Cancel</Button>
              </DialogClose>
              <Button
                type="button"
                className="cursor-pointer bg-blue-600 hover:bg-blue-700"
                onClick={() => checkOutSession(cartId)}
              >
                Visa
              </Button>
              <Button
                type="button"
                className="cursor-pointer bg-green-600 hover:bg-green-700 text-white"
                onClick={() => cashOrder(cartId)}
              >
                Cash
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </>
  );
}
