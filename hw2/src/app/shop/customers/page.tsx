"use client"

import { useState } from "react"

export default function Customers() {
  const [customers, setCustomers] = useState([])
  const [focusedCustomerId, setFocusedCustomerId] = useState(NaN)
  const [focusedCustomer, setFocusedCustomer] = useState({})
  const [error, setError] = useState({} as any)

  const [isEditMode, setIsEditMode] = useState(false)
  const [newCustomer, setNewCustomer] = useState("" as string)

  const getCustomers = async () => {
    const response = await fetch('/api/shop/customers')
    const data = await response.json()
    setCustomers(data.data);
  }

  const getCustomer = async (e:React.FormEvent) => {
    setError({})
    e.preventDefault()
    if (Number.isNaN(focusedCustomerId)){
      setFocusedCustomer({})
      return setError({message: "Please enter a valid customer ID"})
    } 
    fetch(`/api/shop/customers/${focusedCustomerId}`)
      .then(res => res.json())
      .then(data => setFocusedCustomer(data.data))
      .catch(err => setError(err))
  }

  const createCustomer = async (e:React.FormEvent) => {
    e.preventDefault()
    setError({});
    if (newCustomer.length === 0) return
    fetch('/api/shop/customers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newCustomer)
    })
    .then(res => res.json())
    .then(data => {
      setNewCustomer("")
      setFocusedCustomer(data.data)
    })
    .catch(err => setError(err))
  }

  const deleteCustomer = async () => {
    setError({})
    
    if (Number.isNaN(focusedCustomerId)){
      setFocusedCustomer({})
      return setError({message: "Please enter a valid customer ID"})
    }
    fetch(`/api/shop/customers/${focusedCustomerId}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(res => res.json())
      .then(data => {setFocusedCustomer(data.data)})
      .catch(err => setError(err))
      
  }
  
  return(
    <>
      <h1 className="text-4xl font-bold mb-6">Customers</h1>
      <h2 className="text-xl mb-2">Show all customers</h2>
      <button type="button" className="px-2 py-1 bg-gray-800 rounded-md my-2" onClick={getCustomers}>Get Customers</button>
      <pre className="p-4 border rounded-md max-h-96 overflow-y-scroll">
        {JSON.stringify(customers, null, 2)}
      </pre>

      <hr className="my-6 border-gray-700" />

      <h2 className="text-xl mb-2">Manage individual customers</h2>
      <form onSubmit={getCustomer} className="mb-2">
        <input type="number" name="customerId" id="customerId" className="bg-gray-700 text-white px-2 py-1 mr-2" placeholder="customer ID (ex: 1)" 
          onChange={(e) => setFocusedCustomerId(parseInt(e.target.value))} 
        />
        <button className="bg-gray-800 px-2 py-1 rounded-md">Fetch</button>
      </form>
      {error && <p className="text-red-500 mb-2">{error?.message}</p>}
      <pre className="p-4 border rounded-md max-h-96 overflow-y-scroll">
        {JSON.stringify(focusedCustomer, null, 2)}
      </pre>
      {Object.keys(focusedCustomer).length > 0 && (
        <>
        {isEditMode ? (
          <div className="flex gap-3">
            <button className="px-2 py-1 bg-green-800 rounded-md my-2">Save</button>
            <button className="px-2 py-1 bg-gray-800 rounded-md my-2" onClick={() => setIsEditMode(false)}>Cancel</button>
          </div>
          ):(
          <div className="flex gap-3">
            <button className="px-2 py-1 bg-blue-800 rounded-md my-2" onClick={() => setIsEditMode(true)}>Edit customer</button>
            <button className="px-2 py-1 bg-red-800 rounded-md my-2" onClick={deleteCustomer}>Delete customer</button>
          </div>
          )
        }
        </>
      )}

      <hr className="my-6 border-gray-700" />
      
      <h2 className="text-xl mb-2">Add a new customer</h2>
      <form onSubmit={createCustomer}>
        <textarea name="newCustomer" id="newCustomer" rows={12} className="p-2 bg-transparent border rounded-md resize-none w-full" 
          onChange={(e) => setNewCustomer(e.target.value)}
          value={newCustomer}
        />
        <button type="submit" className="bg-gray-800 px-2 py-1 rounded-md mt-2">Add customer</button>
      </form>
    </>
  )
}