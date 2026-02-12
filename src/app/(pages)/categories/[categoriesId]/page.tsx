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
          <Card key={product.id}>
            <Link href={`/products/${product.id}`}>
              <CardHeader>
                <Image
                  src={product.imageCover}
                  width={260}
                  height={160}
                  alt={product.title}
                />
                <CardTitle>{product.title}</CardTitle>
              </CardHeader>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
