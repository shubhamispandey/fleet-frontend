// app/login/page.tsx

"use client";

import Button from "@/components/button/Button";
import Input from "@/components/input/Input";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/dashboard" });
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 bg-white">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image
          className="mx-auto h-10 w-auto"
          src="/img/landing/logo/logo-color-square.svg" // Replace with your logo path
          alt="Your Company"
          width={40}
          height={40}
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Register your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-2" action="#" method="POST">
          <Input id="email" label="Email address" type="email" />
          <Input id="password" label="Password" type="password" />
          <Input
            id="confirm-password"
            label="Confirm Password"
            type="password"
          />

          <div>
            <Button
              kind="primary"
              label="Register"
              className="mt-4"
              fullWidth={true}
              loading={false}
            />
          </div>
        </form>

        {/* Or in center arround dashed line */}

        <div className="relative w-full border-t-2 border-dashed my-8 after:content-['OR'] after:absolute after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:text-slate-800 after:bg-white after:p-2"></div>

        <div className="mt-6">
          <Button
            kind="secondary"
            loading={false}
            iconLeft={
              <Image
                src="/img/landing/logo/google.webp"
                alt="Google"
                width={25}
                height={25}
                className="mr-2"
              />
            }
            label="Register with Google"
            className="mt-4"
            fullWidth={true}
          />
        </div>

        <p className="mt-10 text-center text-sm text-gray-500">
          Already a member?{" "}
          <Link
            href="/login"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Login with your account
          </Link>
        </p>
      </div>
    </div>
  );
}
