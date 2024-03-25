export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const productId = params.id
  const res = await fetch(`http://localhost:5000/products/${productId}`);
  const data = await res.json();

  return Response.json({ data })
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const productId = params.id
  const res = await fetch(`http://localhost:5000/products/${productId}`, {method:"DELETE"});
  const data = await res.json();
  return Response.json({ data })
}