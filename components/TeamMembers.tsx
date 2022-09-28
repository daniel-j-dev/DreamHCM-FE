import { useEffect } from "react";
import useStore from "../state/store";
import { getAllTeamMembers } from "../api/teamMembers";

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
      <h3>Team Members</h3>
      <div className="tmList">
        {teamMembers?.map((e: any, i: Number) => (
          <TeamMemberCard key={`tm${i}`} />
        ))}
      </div>
      <style>{`
      .tmList {
        width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
      }
   `}</style>
    </div>
  );
};

export default TeamMembers;
