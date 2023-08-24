import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../lib/auth";

async function page() {
  const session = await getServerSession(authOptions);
  console.log(session);

  if (session?.user) {
    return (
      <div className="flex items-center justify-center">
        <h2 className="text-2xl ">
          Dashboad - welcome back{session?.user.username}
        </h2>{" "}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center">
      <h2>
        You must <a className="underline ">log in first</a>
      </h2>{" "}
    </div>
  );
}

export default page;
