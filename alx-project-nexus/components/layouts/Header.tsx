import React from 'react';

const Header = ({ children }: React.PropsWithChildren) => {
  return (
    <header className="h-screen bg-[url('../public/assets/hero.png')] bg-size-[100%_100%]  bg-center bg-no-repeat">
      <div className="h-full max-md:bg-black/50">{children}</div>
    </header>
  );
};

export default Header;
