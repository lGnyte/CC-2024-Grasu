import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen max-w-[1000px] mx-auto p-24">
      <h1 className="text-4xl font-bold mb-6">Admin dashboard</h1>
      <h2 className="text-2xl mb-4">Manage your services</h2>
      <Link href={"/shop"} className="text-blue-500">
        Go to shop
      </Link>
    </main>
  );
}
