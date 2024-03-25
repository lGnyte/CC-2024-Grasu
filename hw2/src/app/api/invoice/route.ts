export async function POST(request: Request){
  const res = await fetch('https://api.random.org/json-rpc/4/invoke', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "jsonrpc": "2.0",
      "method": "generateIntegers",
      "params": {
        "apiKey" : process.env.RANDOM_ORG_API_KEY,
        "n": 1,
        "min": 1000,
        "max": 9999,
      },
      "id": 42
    })
  });
  const data = await res.json();
  return Response.json({ data })
}