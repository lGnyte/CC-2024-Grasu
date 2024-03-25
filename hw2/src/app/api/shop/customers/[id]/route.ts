export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const customerId = params.id
  const res = await fetch(`http://localhost:5000/customers/${customerId}`);
  const data = await res.json();

  return Response.json({ data })
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const customerId = params.id
  const res = await fetch(`http://localhost:5000/customers/${customerId}`, {method:"DELETE"});
  const data = await res.json();
  return Response.json({ data })
}