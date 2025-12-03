import React from 'react';

const Header = ({ children }: React.PropsWithChildren) => {
  return (
    <header className="h-[500px] bg-[url('../public/assets/hero.png')] bg-size-[100%_100%]  bg-center bg-no-repeat max-md:object-contain ">
      <div className="h-full max-md:bg-black/50 w-full">{children}</div>
    </header>
  );
};

export default Header;
