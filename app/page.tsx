import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div
      className="flex items-center justify-center flex-col font-bold
      "
    >
      <h1 className="text-3xl px-6 py-4 bg-smoke opacity-70 rounded">HOME</h1>
      <Link href="/dashboard" className="border px-4 py-2 rounded bg-darkblue bg-opacity-80 text-white hover:bg-darkblue">Go to Dashboard</Link>
    </div>
  );
}
