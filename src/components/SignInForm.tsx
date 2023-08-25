"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";

const FormSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must have more than 8 characters"),
});

type FormData = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

function SignInForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
  });

  // works
  const onSubmitCredentials = async (values: FormData) => {
    console.log("clicked");
    const signInData = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });
    if (signInData?.error) {
      console.log(signInData?.error);
    } else {
      // router.refresh();
      setLoading(false);
      router.push("/dashboard");
    }
  };
  const signInWithGoogle = (event: any) => {
    event.preventDefault();
    console.log("clicked");
    signIn("google");
  };

  return (
    <div>
      {loading ? (
        <div className="flex items-center justify-center flex-col">
          <form
            className="flex items-center flex-col mt-10"
            // onSubmit={handleSubmit(onSubmit)}
            // onSubmit={handleSubmit(onSubmit)}
          >
            <h1 className="font-bold underline">Sign In</h1>
            <div className="pt-10 space-y-3 flex flex-col items-center justify-center">
              <input
                className="border p-3  items-center justift-start flex outline-none rounded text-sm w-[200px]"
                placeholder="email@example.com"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
              <input
                className="border p-3  items-center justift-start flex outline-none rounded text-sm w-[200px]"
                type="password"
                placeholder="Enter your password"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}

              <button
                className="rounded-lg border text-white bg-green-600 p-2 w-[200px]"
                type="submit"
                onClick={handleSubmit(onSubmitCredentials)}
              >
                Sign In!
              </button>
              <p className="text-sm">
                {" "}
                If you dont have an account, please{" "}
                <Link href="/sign-up" className="underline text-blue-600">
                  Sign Up
                </Link>
              </p>
            </div>
          </form>

          <button
            onClick={signInWithGoogle}
            className="rounded-lg border text-white bg-gray-600 p-2 w-[200px] mt-2"
            type="submit"
          >
            Sign in with google
          </button>
        </div>
      ) : (
        <h2 className="underline">LOADING!!!!</h2>
      )}
    </div>
  );
}

export default SignInForm;
