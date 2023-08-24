import { NextResponse } from "next/server";
import { prisma } from "../../lib/db";
import { hash } from "bcrypt";
import * as z from "zod";

// db => prisma

const userSchema = z.object({
  username: z.string().min(1, "Username is required").max(100),
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must have more than 8 characters"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, username, password } = userSchema.parse(body);

    // check for existing user
    const existingUserByEmail = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    // if username exist , dont create a new user
    if (existingUserByEmail) {
      return NextResponse.json({
        user: null,
        message: "User with this email already exist",
        status: 409,
      });
    }

    // check for existing username
    const existingUserByUsername = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });
    // if username exist , dont create a new user

    if (existingUserByUsername) {
      return NextResponse.json({
        user: null,
        message: "User with this email already exist",
        status: 409,
      });
    }

    const hashedPassword = await hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    const { password: newUserPassword, ...rest } = newUser;

    return NextResponse.json(
      {
        user: rest,
        message: "User created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 409 }
    );
  }
}
