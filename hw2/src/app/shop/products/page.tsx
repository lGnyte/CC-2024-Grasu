"use client"

import { useState } from "react"

export default function Products() {
  const [products, setProducts] = useState([])
  const [focusedProductId, setFocusedProductId] = useState(NaN)
  const [focusedProduct, setFocusedProduct] = useState({})
  const [error, setError] = useState({} as any)

  const [isEditMode, setIsEditMode] = useState(false)
  const [newProduct, setNewProduct] = useState("" as string)

  const getProducts = async () => {
    const response = await fetch('/api/shop/products')
    const data = await response.json()
    setProducts(data.data);
  }

  const getProduct = async (e:React.FormEvent) => {
    setError({})
    e.preventDefault()
    if (Number.isNaN(focusedProductId)){
      setFocusedProduct({})
      return setError({message: "Please enter a valid product ID"})
    } 
    fetch(`/api/shop/products/${focusedProductId}`)
      .then(res => res.json())
      .then(data => setFocusedProduct(data.data))
      .catch(err => setError(err))
  }

  const createProduct = async (e:React.FormEvent) => {
    e.preventDefault()
    setError({});
    if (newProduct.length === 0) return
    fetch('/api/shop/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newProduct)
    })
    .then(res => res.json())
    .then(data => {
      setNewProduct("")
      setFocusedProduct(data.data)
    })
    .catch(err => setError(err))
  }

  const deleteProduct = async () => {
    setError({})
    
    if (Number.isNaN(focusedProductId)){
      setFocusedProduct({})
      return setError({message: "Please enter a valid product ID"})
    }
    fetch(`/api/shop/products/${focusedProductId}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(res => res.json())
      .then(data => {setFocusedProduct(data.data)})
      .catch(err => setError(err))
      
  }
  
  return(
    <>
      <h1 className="text-4xl font-bold mb-6">Products</h1>
      <h2 className="text-xl mb-2">Show all products</h2>
      <button type="button" className="px-2 py-1 bg-gray-800 rounded-md my-2" onClick={getProducts}>Get Products</button>
      <pre className="p-4 border rounded-md max-h-96 overflow-y-scroll">
        {JSON.stringify(products, null, 2)}
      </pre>

      <hr className="my-6 border-gray-700" />

      <h2 className="text-xl mb-2">Manage individual products</h2>
      <form onSubmit={getProduct} className="mb-2">
        <input type="number" name="productId" id="productId" className="bg-gray-700 text-white px-2 py-1 mr-2" placeholder="product ID (ex: 1)" 
          onChange={(e) => setFocusedProductId(parseInt(e.target.value))} 
        />
        <button className="bg-gray-800 px-2 py-1 rounded-md">Fetch</button>
      </form>
      {error && <p className="text-red-500 mb-2">{error?.message}</p>}
      <pre className="p-4 border rounded-md max-h-96 overflow-y-scroll">
        {JSON.stringify(focusedProduct, null, 2)}
      </pre>
      {Object.keys(focusedProduct).length > 0 && (
        <>
        {isEditMode ? (
          <div className="flex gap-3">
            <button className="px-2 py-1 bg-green-800 rounded-md my-2">Save</button>
            <button className="px-2 py-1 bg-gray-800 rounded-md my-2" onClick={() => setIsEditMode(false)}>Cancel</button>
          </div>
          ):(
          <div className="flex gap-3">
            <button className="px-2 py-1 bg-blue-800 rounded-md my-2" onClick={() => setIsEditMode(true)}>Edit Product</button>
            <button className="px-2 py-1 bg-red-800 rounded-md my-2" onClick={deleteProduct}>Delete Product</button>
          </div>
          )
        }
        </>
      )}

      <hr className="my-6 border-gray-700" />
      
      <h2 className="text-xl mb-2">Add a new product</h2>
      <form onSubmit={createProduct}>
        <textarea name="newProduct" id="newProduct" rows={12} className="p-2 bg-transparent border rounded-md resize-none w-full" 
          onChange={(e) => setNewProduct(e.target.value)}
          value={newProduct}
        />
        <button type="submit" className="bg-gray-800 px-2 py-1 rounded-md mt-2">Add Product</button>
      </form>
    </>
  )
}