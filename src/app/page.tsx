'use client'
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";

export default function HomePage() {
  const session =useSession()
  return (
    <section className="py-24 container mx-auto w-full">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h3 className="lg:text-10xl md:text-5xl font-bold mb-6">
          Welcome {session.status=='authenticated' ? <span className="text-blue-700"> {session.data.user.name}</span>:<span>To ShopMart</span> }
        </h3>

        <p className="text-muted-foreground max-w-2xl mx-auto text-base font-semibold leading-7 mb-10">
          Discover the latest technology, fashion, and lifestyle products.
          Quality guaranteed with fast shipping and excellent customer service.
        </p>

        <div className="flex justify-center gap-4">
          <Link href={"/products"}>
            <Button className="px-8 h-11 rounded-md cursor-pointer bg-black hover:bg-blue-700">
              Shop Now
            </Button>
          </Link>

          <Link href={"/categories"}>
            {" "}
            <Button
              variant="outline"
              className="px-8 h-11 rounded-md hover:bg-black hover:text-white hover:border-2 hover:border-white"
            >
              Browse Categories
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
