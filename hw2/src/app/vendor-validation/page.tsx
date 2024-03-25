export default function VendorValidation() {
  return (
    <>
      <h1 className="text-4xl mb-6 font-bold">Vendor Validation</h1>
      <p className="text-lg mb-4">Validate vendor details based on their <b>CUI</b> / <b>CIF</b> numbers:</p>
      
    </>
  )
}

/*
const anafReq = await sendCUI(formData.cui);
setIsLoading(false);
if(!anafReq || anafReq.denumire === ""){
  toast.error("CUI invalid!");
  return false;
}

=======================

export async function sendCUI(cui:string) {
  let fetchData:DefaultObject;
  await fetch('https://mpb.fly.dev/https://webservicesp.anaf.ro/PlatitorTvaRest/api/v6/ws/tva', {
    method: 'POST',
    headers : { 
      'Content-Type': 'application/json'
    },
    body: JSON.stringify([{
      'cui': cui,
      'data': new Date().toISOString().slice(0, 10)
    }])
  })
  .then((response:Response) =>  response.json())
  .then( data => fetchData = data.found[0])
  .catch(console.error);

  return fetchData;
}
*/