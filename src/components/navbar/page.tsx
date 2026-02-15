"use client";
import React, { useContext } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { HeartIcon, Loader, ShoppingCartIcon, UserIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cartContext } from "../context/cartContext";
import { signOut, useSession } from "next-auth/react";
import { wishlistContext } from "../context/wishListContext";

export default function Navbar() {
  const session = useSession();
  console.log(session);

  const { cartData, isLoading } = useContext(cartContext);
  const { wishlistData, isLoading: wishlistLoading } =
    useContext(wishlistContext);
  return (
    <>
      <nav className="bg-gray-100 py-3 font-semibold text-2xl p-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <h1>
              <Link href={"/"}>ShopMart</Link>
            </h1>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/products">Products</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/categories">Categories</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/brands">Brands</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <div className="flex items-center gap-5">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <UserIcon className="cursor-pointer" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuGroup>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>

                    {session.status == "authenticated" ? (
                      <>
                        <Link href={"/profile"}>
                          <DropdownMenuItem>
                            <span className="text-blue-500">Profile</span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="size-5 text-blue-500"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                              />
                            </svg>
                          </DropdownMenuItem>
                        </Link>
                        <Link href={"/logout"}>
                          <DropdownMenuItem
                            onClick={() => {
                              signOut({ callbackUrl: "/" });
                            }}
                          >
                            <span className="text-red-500">logout</span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="size-6 text-red-500 "
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                              />
                            </svg>
                          </DropdownMenuItem>
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link href={"/login"}>
                          <DropdownMenuItem>login</DropdownMenuItem>
                        </Link>

                        <Link href={"/register"}>
                          <DropdownMenuItem>register</DropdownMenuItem>
                        </Link>
                      </>
                    )}
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
              {session.status == "authenticated" && (
                <div className="relative">
                  <Link href={"/cart"}>
                    <ShoppingCartIcon className="text-blue-700 fill-blue-700" />
                    <Badge className="h-5 min-w-5 rounded-full px-1 text-white font-mono bg-blue-700 tabular-nums absolute -top-4 -end-3">
                      {isLoading ? (
                        <Loader className="animate-spin" />
                      ) : (
                        cartData?.numOfCartItems
                      )}
                    </Badge>
                  </Link>
                </div>
              )}
              {session.status == "authenticated" && (
                <div className="relative ">
                  <Link href={"/wishlist"}>
                    <HeartIcon className="text-red-600 fill-red-600" />
                    <Badge className="  h-5 min-w-5 rounded-full px-1 text-white bg-red-600 font-mono tabular-nums absolute -top-4 -end-3 ">
                      {wishlistLoading ? (
                        <Loader className="animate-spin" size={14} />
                      ) : (
                        wishlistData?.products?.length ?? 0
                      )}
                    </Badge>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
