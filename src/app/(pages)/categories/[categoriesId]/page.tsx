import { productI } from "@/interfaces";
import { CategoryI } from "@/interfaces/category";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import MyStarIcon from "@/components/myStarIcone/myStarIcon";
import { Button } from "@/components/ui/button";
import { HeartIcon, ShoppingCartIcon } from "lucide-react";
import AddToWishlist from "@/components/Addtowishlist/AddToWishList";
import AddToCart from "@/components/addToCart/AddToCart";

export default async function CategoryDetails({
  params,
}: {
  params: { categoriesId: string };
}) {
  const { categoriesId: categoriesId } = await params; // ✅ بدون await
console.log(categoriesId);

  /* ===== Category Info ===== */
  const categoryRes = await fetch(
    `https://ecommerce.routemisr.com/api/v1/categories/${categoriesId}`,
    { cache: "no-store" }
  );

  const { data: category } = await categoryRes.json();

  if (!category) {
    return <p>Category not found</p>;
  }
  

  /* ===== Products By Category ===== */
  const productsRes = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products?category=${categoriesId}`,
    { cache: "no-store" }
  );
  const { data: products }: { data: productI[] } = await productsRes.json();

  return (
    <div className="space-y-10">
      <Card className="grid md:grid-cols-2 items-center w-3/4 mx-auto">
        <div className="p-6 flex justify-center">
          <Image
            src={category.image}
            width={260}
            height={160}
            alt={category.name}
          />
        </div>

        <CardHeader>
          <CardTitle className="text-3xl">{category.name}</CardTitle>
          <CardDescription>{category.slug}</CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
        {products?.map((product) => (
         <Card key={product._id}>
         <Link href={"/products/" + product.id}>
           <CardHeader>
             <Image
               src={product.imageCover}
               className="w-full"
               width={300}
               height={300}
               alt=""
             />
           </CardHeader>

           <CardContent className="mt-4 flex flex-col items-center md:items-start w-full">
             <CardDescription>{product.brand.name}</CardDescription>
             <CardTitle>{product.title.split(" ", 2).join(" ")}</CardTitle>
             <CardDescription>{product.category.name}</CardDescription>

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
        ))}
      </div>
    </div>
  );
}
