import React from 'react';

const Header = ({ children }: React.PropsWithChildren) => {
  return (
    <header className="h-[500px] bg-[url('../public/assets/hero.png')] bg-size-[100%_100%] max-md:bg-size-[100_100%]  bg-center bg-no-repeat max-md:object-cover ">
      <div className="h-full max-md:bg-black/50">{children}</div>
    </header>
  );
};

export default Header;
