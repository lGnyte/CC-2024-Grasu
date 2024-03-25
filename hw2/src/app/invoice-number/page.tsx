"use client"

import { useState } from "react";

export default function InvoiceNumber() {
  const [invoiceNumber, setInvoiceNumber] = useState(0);

  const generateNumber = async () => {
    fetch(`/api/invoice`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(res => res.json())
      .then(data => {setInvoiceNumber(data.data.result.random.data[0])})
      .catch(console.error)
  }
  return (
    <>
      <h1 className="text-4xl font-bold mb-4">Invoice number</h1>
      <p className="text-2xl mb-2">Generate invoice numbers</p>
      <button type="button" className="px-2 py-1 bg-gray-800 rounded-md mb-4d" onClick={generateNumber}>Generate</button>
      <div className="border rounded-md p-2">
        {JSON.stringify(invoiceNumber)}
      </div>
    </>
  )
}
