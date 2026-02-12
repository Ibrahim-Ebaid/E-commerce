"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Order } from "@/interfaces";
import { getUserId, getUserToken } from "../Helpers/getUserToken";
import { getSession } from "next-auth/react";


export default function AllOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  async function getUserOrders() {
    try {
      setLoading(true);
      setError(null);
  const session = await getSession();

      const token = await getUserToken();
      // const userId = await getUserId();
   

      
      if (!token) {
        throw new Error("You must be logged in to see your orders");
      }

    const res = await fetch(
  `https://ecommerce.routemisr.com/api/v1/orders/user/${session?.user.id}`,
  {
    headers: {
      token ,
    },
  }
);

      if (!res.ok) {
        throw new Error("Failed to load orders");
      }

      const data = await res.json();

      // API بيرجع array مباشرة أحيانًا
      const ordersData = Array.isArray(data) ? data : data.data;

      setOrders(ordersData || []);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getUserOrders();
  }, []);

  /* ---------------- UI STATES ---------------- */

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="border rounded-2xl p-6 animate-pulse space-y-4"
          >
            <div className="h-4 bg-muted rounded w-1/3" />
            <div className="h-4 bg-muted rounded w-1/4" />
            <div className="h-20 bg-muted rounded" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 font-medium">{error}</div>;
  }

  if (orders.length === 0) {
    return (
      <div className="text-center text-muted-foreground">
        You haven’t placed any orders yet 🛒
      </div>
    );
  }

  /* ---------------- MAIN UI ---------------- */

  return (
    <div className="space-y-8">
      {orders.map((order) => (
        <div key={order._id} className="border rounded-2xl p-6 space-y-4">
          {/* Order Header */}
          <div className="flex justify-between items-center">
            <div>
              <h2 className="font-bold text-lg">
                Order #{order._id.slice(-6)}
              </h2>
              <p className="text-sm text-muted-foreground">
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div className="text-right">
              <p className="font-bold">{order.totalOrderPrice} EGP</p>
              <p className="text-sm">
                {order.isPaid ? "Paid ✅" : "Not Paid ❌"}
              </p>
            </div>
          </div>

          {/* Order Items */}
          <div className="space-y-3">
            {order.cartItems.map((item) => (
              <div key={item._id} className="flex gap-4 border rounded-xl p-3">
                <Image
                  src={item.product.imageCover}
                  width={90}
                  height={90}
                  alt={item.product.title}
                  className="rounded-lg object-cover"
                />

                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">
                    {item.product.brand.name}
                  </p>
                  <h3 className="font-semibold">{item.product.title}</h3>
                  <p className="text-sm">Qty: {item.count}</p>
                </div>

                <div className="font-semibold">
                  {item.price * item.count} EGP
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
