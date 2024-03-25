"use client"

import { useState } from "react"

export default function VendorValidation() {
  const [cif, setCif] = useState("");
  const [output, setOutput] = useState({} as any);

  const handleSubmit = async (e:React.FormEvent) => {
    e.preventDefault();
    const anafReq = await fetch('/api/vendor-validation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({cif})
    }).then(res => res.json())
      .then(data => {
        setOutput(data.data)
    })
    .catch(console.error)
  }

  return (
    <>
      <h1 className="text-4xl mb-6 font-bold">Vendor Validation</h1>
      <p className="text-lg mb-4">Validate vendor details based on their <b>CUI</b> / <b>CIF</b> numbers:</p>
      <form onSubmit={handleSubmit}>
        <input type="number" name="cif" id="cif" value={cif} onChange={(e) => setCif(e.target.value)} className="bg-gray-700 text-white px-2 py-1 mr-2" placeholder="CIF / CUI (ex. 6859662)" />
        <button type="submit" className="px-2 py-1 bg-gray-800 rounded-md">Validate</button>
      </form>
      <div className="mt-4 border rounded-md p-2">
        {JSON.stringify(output)}
      </div>
    </>
  )
}
