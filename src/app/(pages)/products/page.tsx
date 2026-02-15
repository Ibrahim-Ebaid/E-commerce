import { productI } from "@/interfaces";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import MyStarIcon from "@/components/myStarIcone/myStarIcon";
import Link from "next/link";
import AddToCart from "@/components/addToCart/AddToCart";
import AddToWishlist from "@/components/Addtowishlist/AddToWishList";

export default async function Products() {
  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/products",
    { cache: "no-store" }
  );

  const { data: products }: { data: productI[] } = await response.json();

  console.log(products);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
        {products?.map((product) => (
          <div key={product.id}>
            <Card>
              <Link href={"/products/" + product.id}>
                <CardHeader>
                  <Image
                    src={product.imageCover}
                    className="w-full"
                    width={300}
                    height={300}
                    alt=""
                  />
                  <CardDescription>{product.brand.name}</CardDescription>
                  <CardTitle>{product.title.split(" ", 2).join(" ")}</CardTitle>
                  <CardDescription>{product.category.name}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex">
                    <MyStarIcon />
                    <MyStarIcon />
                    <MyStarIcon />
                    <MyStarIcon />
                    <p>{product.ratingsAverage}</p>
                  </div>
                  <p className="pt-1">
                    price : <span className="font-bold">{product.price}</span>{" "}
                    EGP
                  </p>
                </CardContent>
              </Link>
              <CardFooter className="gap-2">
                <AddToCart productId={product._id} />
                <AddToWishlist productId={product._id} />
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
    </>
  );
}
