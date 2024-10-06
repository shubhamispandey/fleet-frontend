"use client";
import { useLayoutEffect } from "react";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import Features from "@/components/landing/features/Features";
import Header from "@/components/landing/header/Header";
import Hero from "@/components/landing/home/Home";
import Loader from "@/components/loader/Loader";

export default function Home() {
  console.log(process.env.NEXTAUTH_URL);

  const session = useSession();
  useLayoutEffect(() => {
    if (session.status === "authenticated") redirect("/dashboard");
  }, [session]);
  if (session.status === "loading") return <Loader />;
  return (
    <div className="">
      <Header />
      <main>
        <Hero />
        <Features />
      </main>
    </div>
  );
}
