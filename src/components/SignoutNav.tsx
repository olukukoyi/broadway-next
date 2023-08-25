"use client";

import { signOut } from "next-auth/react";
import React from "react";

function SignoutNav() {
  return (
    <div>
      <button
        className="bg-gray-600 rounded p-1 px-2 text-background hover:bg-white hover:text-primary ease-in transition duration-300"
        onClick={() => {
          signOut({
            redirect: true,
            callbackUrl: `${window.location.origin}/sign-in`,
          });
        }}
      >
        Sign Out
      </button>
    </div>
  );
}

export default SignoutNav;
