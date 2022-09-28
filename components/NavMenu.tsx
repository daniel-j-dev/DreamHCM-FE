//import type { NextPage } from "next";
import Image from "next/image";
import closeIcon from "../assets/close_icon.svg";

const NavMenu = ({ setShowNav }: any) => {
  // JSX
  return (
    <div className="navMenu">
      <div className="upperNav">
        <button onClick={() => setShowNav(false)}>
          <Image
            src={closeIcon}
            alt="Close navigation menu icon."
            width={25}
            height={25}
          />
        </button>
        <h2>DreamHCM</h2>
      </div>
      <div className="pageBtns">
        <button className="pgBtn">Dashboard</button>
        <button className="pgBtn">Analytics</button>
        <button className="pgBtn">Settings</button>
      </div>
      <style>{`
    .navMenu {
        position: absolute;
        width: 208px;
        height: 250px;
        background-color: white;


        z-index: 9999;

        //border-radius: 0px 0px 20px 0px;

        display: flex;
        align-items: center;
        flex-direction: column;


        box-shadow: 0px 0px 4px black;
    }

    .upperNav {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        width: 150px;
        margin-right: 25px;
    }
    
    h2 {
        color: black;
    }

    .pageBtns {

        width: 50%;
        display: flex;
        flex-direction: column;
        align-items: start;
        
    }
    
    .pgBtn {
        font-size: 22px;
        color: black;
        padding-top: 5px;
        padding-bottom: 5px;
    }
 
 `}</style>
    </div>
  );
};

export default NavMenu;
