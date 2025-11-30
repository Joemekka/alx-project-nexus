import React from 'react';
import { LogosProp } from '@/interfaces';
import { routeToDest } from '@/utils/pageRoute';

const Logo = ({ color }: LogosProp) => {
  return (
    <h4
      style={{ color: color }}
      onClick={routeToDest('/')}
      className="cursor-pointer"
    >
      Shop<span className="bg-[#E58411] text-black">24</span>
    </h4>
  );
};

export default Logo;
