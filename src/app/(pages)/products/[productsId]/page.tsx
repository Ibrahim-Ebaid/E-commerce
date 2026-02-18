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
   <Card className="flex flex-col md:grid md:grid-cols-2 items-start w-full max-w-5xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden">
  {/* Image / Slider */}
  <div className="p-4 md:p-6 w-full">
    <ProductSlider images={product.images} altContent={product.title} />
  </div>

  {/* Details */}
  <div className="p-4 md:p-6 flex flex-col justify-between w-full">
    <CardHeader className="flex flex-col items-center md:items-start text-center md:text-left">
      <CardDescription className="text-sm text-gray-500">{product.brand.name}</CardDescription>
      <CardTitle className="font-bold text-2xl sm:text-3xl mt-1">{product.title}</CardTitle>
      <CardDescription className="text-gray-600 mt-1">{product.description}</CardDescription>
    </CardHeader>

    <CardContent className="mt-4 flex flex-col items-center md:items-start w-full">
      <CardDescription className="text-sm text-gray-500">{product.category.name}</CardDescription>
      <div className="flex items-center gap-1 mt-2 justify-center md:justify-start">
        <MyStarIcon className="text-yellow-400" />
        <MyStarIcon className="text-yellow-400" />
        <MyStarIcon className="text-yellow-400" />
        <MyStarIcon className="text-yellow-400" />
        <span className="ml-1 font-semibold">({product.ratingsAverage})</span>
      </div>

      <div className="flex flex-col sm:flex-row justify-between w-full mt-2 text-center sm:text-left gap-2">
        <p className="font-bold">Price : {product.price} EGP</p>
        <p className="font-bold">Quantity : {product.quantity}</p>
      </div>
    </CardContent>

    {/* Footer with AddToCart and Wishlist */}
    <CardFooter className="flex items-center gap-3 mt-4 w-full">
      {/* زر Add to Cart يملي العرض */}
      <AddToCart
        productId={product._id}
        className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200 flex justify-center items-center gap-2"
      >
        Add to Cart
      </AddToCart>

      {/* Wishlist icon جنب الزر */}
      <AddToWishlist
        productId={product._id}
        className="w-12 h-12 flex justify-center items-center border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-all duration-200"
      />
    </CardFooter>
  </div>
</Card>



    </>
  );
}
