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
import { CategoryI } from "@/interfaces";

export default async function Brands() {
  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/brands",
    { cache: "no-store" }
  );

  const { data: brands }: { data: CategoryI[] } = await response.json();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
      {brands?.map((brand) => (
        <div key={brand._id}>
          <Card className="hover:shadow-lg transition">
            <Link href={`/brands/${brand._id}`}>
              <CardHeader className="flex items-center justify-center">
                <Image
                  src={brand.image}
                  width={200}
                  height={100}
                  alt={brand.name}
                  className="object-contain h-[100px]"
                />
              </CardHeader>

              <CardContent className="text-center">
                <CardTitle className="text-lg">{brand.name}</CardTitle>
                <CardDescription>Explore {brand.name} products</CardDescription>
              </CardContent>
            </Link>
          </Card>
        </div>
      ))}
    </div>
  );
}
