"use client";

import { useLayoutEffect } from "react";
import { redirect, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const useAuth = (Component: React.FC) => {
  const AuthWrapper: React.FC = (props) => {
    const router = useRouter();
    const session = useSession();

    useLayoutEffect(() => {
      if (session.status === "unauthenticated") {
        redirect("/");
      }
    }, [router, session]);

    return <Component {...props} />;
  };

  return AuthWrapper;
};

export default useAuth;
