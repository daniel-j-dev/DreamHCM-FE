import { useEffect, useState } from "react";
import useStore from "../state/store";
import { getAllTeamMembers } from "../api/teamMembers";
import Image from "next/image";
import plusIcon from "../assets/plus.svg";

// Component imports
import TeamMemberCard from "./TeamMemberCard";
import TMCreate from "./TMCreate";

const TeamMembers = () => {
  // State
  const user = useStore((state) => state.user);
  const teamMembers = useStore((state) => state.teamMembers);
  const setTeamMembers = useStore((state) => state.setTeamMembers);

  const [filteredTM, setFilteredTM] = useState([...teamMembers]); // Team members found using the search bar

  const [showNewTMM, setShowNewTMM] = useState(false); // Show new team member modal

  //Save team members into state on load
  useEffect(() => {
    // Get all teamMembers
    getAllTeamMembers()
      .then((foundMembers: any) => {
        setTeamMembers(foundMembers.data);
        setFilteredTM(foundMembers.data);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, [user]);

  // Function(s)
  const searchTeamMembers = (e: any) => {
    const searchString = e.target.value.toLowerCase();
    let result = [];

    for (let m of teamMembers)
      if (m.name.toLowerCase().includes(searchString)) result.push(m);

    setFilteredTM(result);
  };

  // JSX
  return (
    <div className="tm">
      {showNewTMM ? <TMCreate setShowNewTMM={setShowNewTMM} /> : <></>}

      <div className="tmInner">
        <h3>Team Members ({filteredTM.length})</h3>
        <div className="tmControls">
          <input
            className="tmSearch"
            placeholder="Search for a member"
            onChange={(e) => searchTeamMembers(e)}
          />
          <button className="newTMBtn" onClick={() => setShowNewTMM(true)}>
            <Image src={plusIcon} alt="Plus icon" height={20} width={20} />
          </button>
        </div>
        <div className="tmList">
          {filteredTM.map((e: any, i: Number) => (
            <TeamMemberCard key={`tm${i}`} tmData={e} />
          ))}
        </div>
      </div>
      <style>{`
      .tm {
        width: 100%;

        display: flex;
        justify-content: center;

        margin-top: 50px;
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

      @media only screen and (min-width: 650px) {
        .tmInner {
            width: 650px;
        }

        .tmList {
            flex-direction: row;
            justify-content: space-between;
            flex-wrap: wrap;
        }

        .tmControls {
            justify-content: start;
        }

        .tmSearch {
            margin-right: 30px;
        }
      }
   `}</style>
    </div>
  );
};

export default TeamMembers;
