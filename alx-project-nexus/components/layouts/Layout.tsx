import React from "react";
import Header from "./Header";
import Nav from "./Nav";
import Footer from "./Footer";

const Layout = ({ children }: React.PropsWithChildren) => {
  return (
    <>
      {/* <Nav /> */}
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
