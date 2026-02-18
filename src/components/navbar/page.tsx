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

import {
  HeartIcon,
  Loader,
  ShoppingCartIcon,
  UserIcon,
  MenuIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cartContext } from "../context/cartContext";
import { signOut, useSession } from "next-auth/react";
import { wishlistContext } from "../context/wishListContext";

export default function Navbar() {
  const session = useSession();

  const { cartData, isLoading } = useContext(cartContext);
  const { wishlistData, isLoading: wishlistLoading } =
    useContext(wishlistContext);

  return (
    <>
      <nav className="bg-gray-100 py-3 font-semibold text-2xl p-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <Link href={"/"}>
              <h1 className="flex justify-center items-center gap-2 hover:text-blue-700 p-0 m-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z"
                  />
                </svg>
                <span> ShopMart</span>
              </h1>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:block">
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
            </div>

            {/* Desktop Icons */}
            <div className="hidden md:flex items-center gap-5">
              {/* USER */}
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
                          <DropdownMenuItem className="cursor-pointer">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="size-6 text-blue-500"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                              />
                            </svg>

                            <span className="text-blue-500 font-semibold">
                              Profile
                            </span>
                          </DropdownMenuItem>
                        </Link>

                        <DropdownMenuItem
                          className="cursor-pointer"
                          onClick={() => {
                            signOut({ callbackUrl: "/" });
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6 text-red-500"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                            />
                          </svg>

                          <span className="text-red-500 font-semibold">
                            LogOut
                          </span>
                        </DropdownMenuItem>
                      </>
                    ) : (
                      <>
                        <Link href={"/login"}>
                          <DropdownMenuItem><span className="hover:text-blue-500 font-semibold cursor-pointer">Login</span></DropdownMenuItem>
                        </Link>

                        <Link href={"/register"}>
                          <DropdownMenuItem><span className="hover:text-blue-500 font-semibold cursor-pointer">Register</span></DropdownMenuItem>
                        </Link>
                      </>
                    )}
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* CART */}
              {session.status == "authenticated" && (
                <div className="relative">
                  <Link href={"/cart"}>
                    <ShoppingCartIcon className="text-blue-700 fill-blue-700" />
                    <Badge className="absolute -top-5 -end-3 bg-blue-700 text-white">
                      {isLoading ? (
                        <Loader className="animate-spin" />
                      ) : (
                        cartData?.numOfCartItems
                      )}
                    </Badge>
                  </Link>
                </div>
              )}

              {/* WISHLIST */}
              {session.status == "authenticated" && (
                <div className="relative">
                  <Link href={"/wishlist"}>
                    <HeartIcon className="text-red-600 fill-red-600" />
                    <Badge className="absolute -top-5 -end-3 bg-red-600 text-white">
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

            {/* Mobile Dropdown */}
            <div className="md:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <MenuIcon className="cursor-pointer" />
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Menu</DropdownMenuLabel>
                  <DropdownMenuGroup>
                    <Link href="/products">
                      <DropdownMenuItem>Products</DropdownMenuItem>
                    </Link>
                    <Link href="/categories">
                      <DropdownMenuItem>Categories</DropdownMenuItem>
                    </Link>
                    <Link href="/brands">
                      <DropdownMenuItem>Brands</DropdownMenuItem>
                    </Link>
                  </DropdownMenuGroup>

                  <DropdownMenuLabel>Account</DropdownMenuLabel>

                  <DropdownMenuGroup>
                    {session.status == "authenticated" ? (
                      <>
                        <Link href={"/profile"}>
                          <DropdownMenuItem className="text-blue-600">
                            <UserIcon className="mr-1 text-blue-600 " />
                            Profile
                          </DropdownMenuItem>
                        </Link>
                        <Link href="/cart">
                          <DropdownMenuItem className="relative text-yellow-500">
                            <ShoppingCartIcon className="text-yellow-500 fill-yellow-500" />
                            Cart
                            <Badge className="absolute -top-1 start-15  bg-yellow-500 text-black text-center px-1.5 py-0.5 text-xs">
                              {isLoading ? (
                                <Loader className="animate-spin" />
                              ) : (
                                cartData?.numOfCartItems
                              )}
                            </Badge>
                          </DropdownMenuItem>
                        </Link>

                        <Link href="/wishlist">
                          <DropdownMenuItem className="relative text-red-600">
                            <HeartIcon className="text-red-600 fill-red-600 " />
                            WishList
                            <Badge className="absolute -top-1 start-22 text-white bg-red-600 text-center px-1.5 py-0.5 text-xs">
                              {wishlistLoading ? (
                                <Loader className="animate-spin" size={14} />
                              ) : (
                                wishlistData?.products?.length ?? 0
                              )}
                            </Badge>
                          </DropdownMenuItem>
                        </Link>

                        <DropdownMenuItem
                          onClick={() => {
                            signOut({ callbackUrl: "/" });
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6 text-red-500"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                            />
                          </svg>
                          <span className="text-red-500">logout</span>
                        </DropdownMenuItem>
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
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
