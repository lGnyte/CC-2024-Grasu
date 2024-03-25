export async function POST(request:Request) {
  const body = await request.json();
  console.log(body);
  let fetchData={};
  await fetch('https://mpb.fly.dev/https://webservicesp.anaf.ro/PlatitorTvaRest/api/v6/ws/tva', {
    method: 'POST',
    headers : { 
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      'cui': body.cif,
      'data': new Date().toISOString().slice(0, 10)
    })
  })
  .then(async (response:Response) => {
    console.log(response);
    return response.json();
  })
  .then( data => fetchData = data.found[0])
  .catch(console.error);

  return Response.json({ fetchData })
}