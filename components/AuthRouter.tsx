import useAuth from "@/hooks/queries/useAuth";
import { router, useFocusEffect } from "expo-router";
import React, { ReactNode } from "react";

interface AuthRouterProps {
  children: ReactNode;
}

const AuthRouter = ({ children }: AuthRouterProps) => {
  const { auth } = useAuth();

  useFocusEffect(() => {
    !auth.id && router.replace("/auth");
  });

  return <>{children}</>;
};

export default AuthRouter;
