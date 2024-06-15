import ResponsiveAppBar from "@/components/CustomNabvar";
import { useRouter } from "next/router";
import React from "react";

const Layout = ({ children }) => {
  const router = useRouter();
  const noNavbar = !router.pathname.match(/login/g);
  return (
    <div>
      {noNavbar && <ResponsiveAppBar />}
      <div>{children}</div>
    </div>
  );
};

export default Layout;
