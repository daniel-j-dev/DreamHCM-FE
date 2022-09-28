import Image from "next/image";
import userIcon from "../assets/user_icon.svg";

const TeamMemberCard = ({ tmData }: any) => {
  const hireDateFormatted = new Date(tmData.hireDate).toLocaleDateString();

  // JSX
  return (
    <div className="tmCard">
      <Image src={userIcon} alt="Profile picture" width={40} height={40} />
      <div className="tmInfo">
        <span className="tmName">{tmData.name}</span>
        <span>{tmData.currentPosition}</span>
        <span>Member since: {hireDateFormatted}</span>
      </div>
      <style>{`
    .tmCard {
        width: 300px;
        height: 149px;
        border-radius: 20px;
        box-shadow: 0px 0px 2px black;

        margin-bottom: 20px;

        display: flex; 
        flex-direction: row;
        justify-content: space-around;
        align-content: center;
        background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);

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
  );
};

export default TeamMemberCard;
