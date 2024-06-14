import ResponsiveAppBar from "@/components/CustomNabvar";
import { useRouter } from "next/router";
import React from "react";

const Layout = ({ children }) => {
  return (
    <div>
      <ResponsiveAppBar />
      <div>{children}</div>
    </div>
  );
};

export default Layout;
