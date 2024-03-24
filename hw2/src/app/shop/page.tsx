"use client"

import Link from "next/link"

export default function Shop(){

  return (
    <>
      <h1 className="text-4xl mb-6 font-bold">Shop</h1>
      <p className="text-lg">Welcome to your shop!</p>
      <p className="text-lg mb-4">Explore your available features:</p>
      <Link href={"/shop/customers"} className="px-4 py-2 bg-gray-800 rounded-md my-2">
        Manage customers
      </Link>
      <br /><br />
      <Link href={"/shop/products"} className="px-4 py-2 bg-gray-800 rounded-md my-2">
        Manage products
      </Link>
    </>
  )
}