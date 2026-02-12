import { productI } from "@/interfaces";
import { BrandI } from "@/interfaces/brand";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import MyStarIcon from "@/components/myStarIcone/myStarIcon";
import AddToCart from "@/components/addToCart/AddToCart";

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
          <Card key={product.id}>
            <Link href={`/products/${product.id}`}>
              <CardHeader>
                <Image
                  src={product.imageCover}
                  width={300}
                  height={300}
                  alt={product.title}
                  className="w-full"
                />
                <CardTitle>{product.title.split(" ", 2).join(" ")}</CardTitle>
                <CardDescription>{product.category.name}</CardDescription>
              </CardHeader>

              <CardContent>
                <div className="flex gap-1 items-center">
                  <MyStarIcon />
                  <MyStarIcon />
                  <MyStarIcon />
                  <MyStarIcon />({product.ratingsAverage})
                </div>
                <p className="mt-1 font-bold">Price : {product.price} EGP</p>
              </CardContent>
            </Link>
            <AddToCart productId={product._id} />
          </Card>
        ))}
      </div>
    </div>
  );
}
