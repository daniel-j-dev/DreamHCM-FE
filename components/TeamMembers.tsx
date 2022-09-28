import { useEffect } from "react";
import useStore from "../state/store";
import { getAllTeamMembers } from "../api/teamMembers";
import Image from "next/image";
import plusIcon from "../assets/plus.svg";

// Component imports
import TeamMemberCard from "./TeamMemberCard";

const TeamMembers = () => {
  // State
  const user = useStore((state) => state.user);
  const teamMembers = useStore((state) => state.teamMembers);
  const setTeamMembers = useStore((state) => state.setTeamMembers);

  //Save team members into state on load
  useEffect(() => {
    // Skip network requests if state hasn't loaded yet
    if (!user?.token || user.token.length < 1) return;

    // Get all teamMembers
    getAllTeamMembers(user.token)
      .then((foundMembers: any) => {
        setTeamMembers(foundMembers.data);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, [user]);

  // JSX
  return (
    <div className="tm">
      <div className="tmInner">
        <h3>Team Members ({teamMembers.length})</h3>
        <div className="tmControls">
          <input className="tmSearch" placeholder="Search for a member" />
          <button className="newTMBtn">
            <Image src={plusIcon} alt="Plus icon" height={20} width={20} />
          </button>
        </div>
        <div className="tmList">
          {teamMembers?.map((e: any, i: Number) => (
            <TeamMemberCard key={`tm${i}`} tmData={e} />
          ))}
        </div>
      </div>
      <style>{`
      .tm {
        width: 100%;

        display: flex;
        justify-content: center;
      }

      .tmList {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
      }

      .tmControls {
        display: flex;
        justify-content: space-between;

        margin-bottom: 20px;
      }

      .tmSearch {
        border-radius: 50px;

        box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);

        padding: 8px;
        font-size: 18px;
      }

      .newTMBtn {
        display: flex;
        justify-content: center;
        align-items: center;

        width: 35px;
        height: 35px;

        border-radius: 50px;

        box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
      }
   `}</style>
    </div>
  );
};

export default TeamMembers;
