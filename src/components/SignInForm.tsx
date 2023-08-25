"use client";

import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

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
      router.refresh();
      router.push("/dashboard");
    }
  };
  const signInWithGoogle = (event: any) => {
    event.preventDefault();
    console.log("clicked");
    signIn("google");
  };

  return (
    <>
      <form
        className="flex items-center flex-col mt-10 bg-blue bg-opacity-50 p-4"
        // onSubmit={handleSubmit(onSubmit)}
        // onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="font-bold p-2 border rounded bg-secondary">Sign In</h1>
        <div className="p-10 space-y-3 flex flex-col items-center justify-center">
          <input
            className="border p-3  items-center justift-start flex outline-none rounded text-sm w-[200px]"
            placeholder="email@example.com"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
          <input
            className="border p-3 items-center justift-start flex outline-none rounded text-sm w-[200px]"
            type="password"
            placeholder="Enter your password"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}

          <button
            className="rounded-lg border text-white bg-green-600 p-2 w-[200px] hover:bg-green-800"
            type="submit"
            onClick={handleSubmit(onSubmitCredentials)}
          >
            Sign In!
          </button>
          <p className="text-sm text-secondary">
            {" "}
            If you dont have an account, please{" "}
            <a className="underline font-bold text-smoke">Sign Up</a>
          </p>
        </div>
      </form>

      <button
        onClick={signInWithGoogle}
        className=" p-2 border hover:border-foreground border-2 rounded-lg  text-white bg-gray-600 p-2 w-[200px] hover:bg-white hover:text-primary "
        type="submit"
      >
        Sign in with google
      </button>
    </>
  );
}

export default SignInForm;
