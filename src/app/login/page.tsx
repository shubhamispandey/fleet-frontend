// app/login/page.tsx

"use client";

import Button from "@/components/button/Button";
import Input from "@/components/input/Input";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
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
          Login to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" action="#" method="POST">
          <div>
            <Input id="email" label="Email address" type="email" />
            <div className="text-sm text-right mt-2">
              <Link
                className="font-semibold text-indigo-600 hover:text-indigo-500"
                href="/forgot-password"
              >
                Forgot password?
              </Link>
            </div>
            <Input id="password" label="Password" type="password" />
          </div>

          <div>
            <Button
              kind="primary"
              label="Login"
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
            onClick={() => signIn("google")}
            label="Login with Google"
            className="mt-4"
            fullWidth={true}
          />
        </div>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?{" "}
          <Link
            href="/register"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Register with your account
          </Link>
        </p>
      </div>
    </div>
  );
}
