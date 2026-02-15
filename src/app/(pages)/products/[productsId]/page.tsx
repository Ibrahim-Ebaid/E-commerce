/* eslint-disable prefer-const */

import { productI } from "@/interfaces";
import { Params } from "next/dist/server/request/params";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import MyStarIcon from "@/components/myStarIcone/myStarIcon";
import ProductSlider from "@/components/productSlider/productSlider";
import AddToCart from "@/components/addToCart/AddToCart";
import AddToWishlist from "@/components/Addtowishlist/AddToWishList";

export default async function ProductDetails({ params }: { params: Params }) {
  let { productsId } = await params;

  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/products/" + productsId
  );

  let { data: product }: { data: productI } = await response.json();

  return (
    <>
      <Card className="grid md:grid-cols-2 items-center w-3/4 mx-auto">
        <div className="p-3">
          <ProductSlider images={product.images} altContent={product.title} />
        </div>
        <div>
          <CardHeader>
            <CardDescription>{product.brand.name}</CardDescription>
            <CardTitle className="font-bold text-3xl">
              {product.title}
            </CardTitle>
            <CardDescription>{product.description}</CardDescription>
          </CardHeader>
          <CardContent className="mt-2">
            <CardDescription>{product.category.name}</CardDescription>
            <div className="flex gap-1 mt-2">
              <MyStarIcon />
              <MyStarIcon />
              <MyStarIcon />
              <MyStarIcon />({product.ratingsAverage})
            </div>
            <div className="flex justify-between mt-2">
              <p className="font-bold">Price : {product.price} EGP</p>
              <p className="font-bold">Qantity : {product.quantity}</p>
            </div>
          </CardContent>
          <div>
            {" "}
            <CardFooter className="gap-2 pt-2">
              <AddToCart productId={product._id} />
              <AddToWishlist productId={product._id} />
            </CardFooter>
          </div>
        </div>
      </Card>
    </>
  );
}
