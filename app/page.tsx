import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div
      className="flex items-center justify-center flex-col
      "
    >
      <h1>HOME</h1>
      <Link href="/dashboard">Go to Dashboard</Link>
      <Link href="/shows">Shows</Link>
    </div>
  );
}
