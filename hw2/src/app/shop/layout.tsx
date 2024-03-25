import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "HW2 - Shop",
  description: "Shop area",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen max-w-[1000px] mx-auto p-24">
      <div className="mb-4 hover:text-blue-500">
        &lt;&nbsp;
        <Link href={"/"}>
          Home
        </Link>
      </div>
      {children}
    </main>
  );
}