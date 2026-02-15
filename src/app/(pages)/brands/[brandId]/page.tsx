import { productI } from "@/interfaces";
import { BrandI } from "@/interfaces/brand";
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
import AddToCart from "@/components/addToCart/AddToCart";
import AddToWishlist from "@/components/Addtowishlist/AddToWishList";

export default async function BrandDetails({
  params,
}: {
  params: { brandId: string };
}) {
  const { brandId } = await params;

  /* ===== Brand Info ===== */
  const brandRes = await fetch(
    `https://ecommerce.routemisr.com/api/v1/brands/${brandId}`,
    { cache: "no-store" }
  );
  const { data: brand }: { data: BrandI } = await brandRes.json();

  /* ===== Brand Products ===== */
  const productsRes = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products?brand=${brandId}`,
    { cache: "no-store" }
  );
  const { data: products }: { data: productI[] } = await productsRes.json();

  return (
    <div className="space-y-10">
      <Card className="grid md:grid-cols-2 items-center w-3/4 mx-auto">
        <div className="p-6 flex justify-center">
          <Image
            src={brand.image}
            width={260}
            height={160}
            alt={brand.name}
            className="object-contain"
          />
        </div>

        <div>
          <CardHeader>
            <CardTitle className="text-3xl font-bold">{brand.name}</CardTitle>
            <CardDescription>Brand slug : {brand.slug}</CardDescription>
          </CardHeader>
        </div>
      </Card>

      {/* ========= Products Section ========= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
        {products.map((product) => (
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
        ))}
      </div>
    </div>
  );
}
