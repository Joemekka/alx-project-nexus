import React from 'react';
import Logo from './Logo';
import { spacings, brandColor } from '@/constant/styles';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  const now = new Date().getFullYear();
  return (
    <footer className="flex flex-col items-center justify-center bg-[#F7F7F7] h-[300px]">
      <div className="flex justify-between w-[90%] m-auto">
        <div className={`flex flex-col gap-[${spacings.gapSmall}] w-[40%]`}>
          <Logo />
          <p>
            The advantage of hiring a workspace with us is that givees you
            comfortable service and all-around facilities.
          </p>
        </div>
        <div>
          <h5 className={`text-[${brandColor.secondaryColor}]`}>Services</h5>
          <ul>
            <li>Email Marketing</li>
            <li>Campaigns</li>
            <li>Branding</li>
          </ul>
        </div>
        <div>
          <h5 className={`text-[${brandColor.secondaryColor}]`}>Furniture</h5>
          <ul>
            <li>All</li>
            <li>Beds</li>
            <li>Chair</li>
          </ul>
        </div>
        <div>
          <h5 className={`text-[${brandColor.secondaryColor}]`}>Follow Us</h5>
          <div>
            <div className="flex mb-2.5 gap-x-1.5">
              <Facebook />
              Facebook
            </div>
            <div className="flex mb-2.5 gap-x-1.5">
              <Twitter />
              Twitter
            </div>
            <div className="flex mb-2.5 gap-x-1.5">
              <Instagram />
              Instagram
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-around">
        <p>Copywright ©{null}</p>
        <div>
          <span>Terms & Condition</span>
          <span>Privacy Policy</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
