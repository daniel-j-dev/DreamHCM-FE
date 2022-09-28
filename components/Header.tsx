import type { NextPage } from "next";
import Image from "next/image";
import navMenuImg from "../assets/hamburger-menu.svg";
import userIcon from "../assets/user_icon.svg";
import { useState } from "react";

// Component imports
import NavMenu from "./NavMenu";

const Header: NextPage = () => {
  // State
  const [showNav, setShowNav] = useState(false);

  // JSX
  return (
    <>
      {showNav ? <NavMenu setShowNav={setShowNav} /> : <></>}
      <div className="header">
        <button onClick={() => setShowNav(true)}>
          <Image src={navMenuImg} alt="Navigation menu icon." />
        </button>
        <span className="brandName">
          Dream<span className="brandHCM">HCM</span>
        </span>
        <button>
          <Image
            src={userIcon}
            height={25}
            width={25}
            alt="Account menu icon."
          />
        </button>
        <style>{`
      .header {
          width: 100%;
          height: 50px;
          
          padding-left: 10px;
          padding-right: 10px;
          
          box-shadow: 0px 0px 2px black;
          
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .brandName {
            color: #303841;
            font-weight: bold;
            
            font-size: 20px;
        }
        
        .brandHCM {
            color: #2185D5;
          }
          
          `}</style>
      </div>
    </>
  );
};

export default Header;
