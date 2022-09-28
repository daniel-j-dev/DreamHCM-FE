import type { NextPage } from "next";
import Image from "next/image";
import navMenuImg from "../assets/hamburger-menu.svg";

const Header: NextPage = () => {
  return (
    <div className="header">
      <button>
        <Image src={navMenuImg} />
      </button>
      <span className="brandName">
        Dream<span className="brandHCM">HCM</span>
      </span>
      <button>Account</button>
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
  );
};

export default Header;
