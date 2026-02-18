"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";

export default function HomePage() {
  const session = useSession();
  return (
    <section className="py-16 sm:py-24 w-full bg-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
          Welcome{" "}
          {session.status == "authenticated" ? (
            <span className="text-blue-700">{session.data.user.name}</span>
          ) : (
            <span>To ShopMart</span>
          )}
        </h3>

        <p className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg font-semibold leading-7 mb-10">
          Discover the latest technology, fashion, and lifestyle products.
          Quality guaranteed with fast shipping and excellent customer service.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link href={"/products"} className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto px-8 h-11 rounded-md bg-blue-700 text-white hover:bg-blue-500 transition-all duration-200 cursor-pointer">
              Shop Now
            </Button>
          </Link>

          <Link href={"/categories"} className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto px-8 h-11 rounded-md bg-blue-700 text-white hover:bg-blue-500 transition-all duration-200 cursor-pointer">
              Browse Categories
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
