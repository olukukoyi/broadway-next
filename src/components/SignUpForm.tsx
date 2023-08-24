"use client";

import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

const FormSchema = z
  .object({
    username: z.string().min(1, "Username is required").max(100),
    email: z.string().min(1, "Email is required").email("Invalid email"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must have more than 8 characters"),
    confirmPassword: z.string().min(1, "Password confirmation is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

type FormData = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

function SignUpForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = async (values: FormData) => {
    console.log("clicked");
    try {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "applications/json",
        },
        body: JSON.stringify({
          username: values.username,
          email: values.email,
          password: values.password,
        }),
      });
      if (response.ok) {
        router.push("/sign-in"); // redirect them to sign in to sign in
      }
    } catch (error) {}
  };

  return (
    <form
      className="flex items-center flex-col mt-10"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="font-bold underline">Sign Up</h1>
      <div className="p-10 space-y-3 flex flex-col items-center justify-center">
        <input
          className="border p-2 outline-none rounded"
          placeholder="username"
          {...register("username")}
        />
        {errors.username && (
          <p className="text-red-500">{errors.username.message}</p>
        )}
        <input
          className="border p-2 outline-none rounded"
          placeholder="email"
          {...register("email")}
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        <input
          className="border p-2 outline-none rounded"
          type="password"
          placeholder="password"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}
        <input
          className="border p-2 outline-none rounded"
          type="password"
          placeholder="confirmPassword"
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <p className="text-red-500">{errors.confirmPassword.message}</p>
        )}
        <button
          className="rounded-lg border text-white bg-green-600 p-2 w-[200px]"
          type="submit"
        >
          Sign Up!
        </button>
        <p> or </p>
        <button
          className="rounded-lg border text-white bg-gray-600 p-2 w-[200px]"
          type="submit"
        >
          Sign in with google
        </button>
      </div>
    </form>
  );
}

export default SignUpForm;
