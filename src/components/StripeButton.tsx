"use client";

import getStripe from "@/lib/get-stripjs";
import React from "react";
import { fetchPostJSON } from "../../app/utils/api-helper";
import { Show } from "@/lib/db";
import { checkout } from "@/lib/checkout";

interface pageProps {
  show: Show;
}

function StripeButton({ show }: pageProps) {
  const handleCheckout: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (show?.stripId) {
      checkout({
        lineItems: [
          {
            price: show?.stripId,
            quantity: 1,
          },
        ],
      });
    } else {
      console.log("No Stipe Id (stripID in db)");
    }
  };
  return (
    <form onSubmit={handleCheckout}>
      <button>Buy tickets for show</button>
    </form>
  );
}

export default StripeButton;
