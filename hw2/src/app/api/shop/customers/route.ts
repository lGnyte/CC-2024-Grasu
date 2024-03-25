export async function GET(){
  const res = await fetch('http://localhost:5000/customers');
  const data = await res.json();

  return Response.json({ data })
}

export async function POST(request: Request){
  const body = await request.json();
  const res = await fetch('http://localhost:5000/customers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: body
  });
  const data = await res.json();
  return Response.json({ data })
}
