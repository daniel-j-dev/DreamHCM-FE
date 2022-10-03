import Image from "next/image";
import { useState } from "react";
import TMFullView from "./TMFullView";
import userIcon from "../assets/user_icon.svg";

const TeamMemberCard = ({ tmData }: any) => {
  // State
  const [showModal, setShowModal] = useState(false);

  const hireDateFormatted = new Date(tmData.hireDate).toLocaleDateString();

  // JSX
  return (
    <>
      {showModal ? (
        <TMFullView setShowModal={setShowModal} memberData={tmData} />
      ) : (
        <></>
      )}
      <div className="tmCard" onClick={() => setShowModal(true)}>
        <div className="profilePic">
          <Image src={userIcon} alt="Profile picture" width={40} height={40} />
        </div>
        <div className="tmInfo">
          <span className="tmName">{tmData.name}</span>
          <span>{tmData.currentPosition}</span>
          <span>Member since: {hireDateFormatted}</span>
        </div>
        <style>{`
    .tmCard {
      width: 300px;
      height: 149px;
      
      box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
      
      margin-bottom: 20px;
      
      display: flex; 
      flex-direction: row;
      justify-content: space-around;
      align-content: center;
      background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);
      
      cursor: pointer;

      border-radius: 15px;
    }

    .profilePic {
      width: 40px;
      height: 40px;

      align-self: center;

      //border-radius: 50%;

      //box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
    }

    .tmInfo {
      display: flex; 
      flex-direction: column;
      justify-content: center;
      align-content: center;
      
        margin-right: 20px;
        
        width: 140px;
      }
      
      .tmName {
        font-weight: bold;
      }
      `}</style>
      </div>
    </>
  );
};

export default TeamMemberCard;
