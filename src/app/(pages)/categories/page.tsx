import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { CategoryI } from "@/interfaces/category";

export default async function Categories() {
  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/categories",
    { cache: "no-store" }
  );

  const { data: categories }: { data: CategoryI[] } = await response.json();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
      {categories?.map((category) => (
        <div key={category._id}>
          <Card className="hover:shadow-lg transition">
            <Link href={`/categories/${category._id}`}>
              <CardHeader className="flex items-center justify-center">
                <Image
                  src={category.image}
                  width={200}
                  height={120}
                  alt={category.name}
                  className="object-contain h-[120px]"
                />
              </CardHeader>

              <CardContent className="text-center">
                <CardTitle className="text-lg">{category.name}</CardTitle>
                <CardDescription>Browse {category.name}</CardDescription>
              </CardContent>
            </Link>
          </Card>
        </div>
      ))}
    </div>
  );
}
