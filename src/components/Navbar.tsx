import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "@/lib/auth";
import SignoutNav from "./SignoutNav";

async function Navbar() {
  const session = await getServerSession(authOptions);

  return (
    <div className="w-full flex items-center justify-between px-8 py-4 border-b">
      <Link href="/">HOME</Link>
      <div className="flex w-[25%] justify-between">
        {session?.user ? (
          <SignoutNav />
        ) : (
          <>
            <Link
              href="/sign-in"
              className="bg-gray-600 rounded p-1 px-2 text-white hover:bg-white hover:text-gray-600 ease-in transition duration-300"
            >
              Sign in
            </Link>
            <Link
              href="/sign-up"
              className="bg-gray-600 rounded p-1 px-2 text-white hover:bg-white hover:text-gray-600 ease-in transition duration-300"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
