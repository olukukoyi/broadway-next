import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "@/lib/auth";

async function page() {
  const session = await getServerSession(authOptions);
  console.log("Current user session: ", session);

  if (session?.user) {
    return (
      <div className="flex items-center justify-center">
        <h2 className="text-3xl p-5 font-bold text-darkblue bg-smoke bg-opacity-70 rounded underline">
          Dashboad - welcome back!!!{session?.user.username}
        </h2>{" "}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center">
      <h2 className="bg-smoke bg-opacity-80 rounded p-2 text-lg text-foreground">
        You must <a className="underline font-medium text-primary">log in first</a>
      </h2>{" "}
    </div>
  );
}

export default page;
