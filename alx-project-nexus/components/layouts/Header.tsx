import React from "react";

const Header = ({ children }: React.PropsWithChildren) => {
  return (
    <header className=" gap-3 h-screen bg-[url('../public/assets/hero.png')] bg-size-[100%_100%]  bg-center bg-no-repeat">
      {children}
    </header>
  );
};

export default Header;
