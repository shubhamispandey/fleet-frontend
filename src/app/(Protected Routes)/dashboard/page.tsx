"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@headlessui/react";
import useAuth from "@/components/auth/useAuth";

const Dashboard = () => {
  const router = useRouter();
  const engage = () => {
    router.push("/engage");
  };
  return (
    <div className="flex items-center justify-center w-full h-[calc(100vh-64px)]">
      <Button
        className="flex items-center gap-3 rounded bg-sky-600 py-2 px-4 text-sm text-white data-[hover]:bg-sky-500 data-[active]:bg-sky-700"
        onClick={engage}
      >
        Start a new meeting <i className="lni lni-video"></i>
      </Button>
    </div>
  );
};

export default useAuth(Dashboard);
