// Modal that displays various information about a Team Member
// ...along with inputs for related CRUD operations
import Image from "next/image";
import { useState } from "react";
import closeIcon from "../assets/close_icon.svg";
import useStore from "../state/store";
import TMEdit from "./TMEdit";
import { deleteTeamMember, getAllTeamMembers } from "../api/teamMembers";

const TMFullView = ({ setShowModal, memberData }: any) => {
  // State
  const setTeamMembers = useStore((state) => state.setTeamMembers);
  const [editing, setEditing] = useState(false); // True if you clicked the "edit" button

  // Functions
  const handleDelete = async () => {
    // Delete team member
    await deleteTeamMember(memberData._id);

    // Close modal & refresh teamMembers list in state
    setShowModal(false);

    const mems = await getAllTeamMembers();

    setTeamMembers(mems.data);
  };

  // JSX
  return (
    <div className="modalOuter">
      <div className="modalInner">
        <button className="closeBtn" onClick={() => setShowModal(false)}>
          <Image
            src={closeIcon}
            alt="Close modal menu icon."
            width={25}
            height={25}
          />
        </button>

        {editing ? (
          <TMEdit setShowModal={setEditing} memberData={memberData} />
        ) : (
          <div className="actions">
            <button className="actionBtns" onClick={() => handleDelete()}>
              Delete
            </button>
            <button className="actionBtns" onClick={() => setEditing(true)}>
              Edit
            </button>
          </div>
        )}
      </div>
      <style>{`
      .modalOuter {
          position: fixed;
          width: 100%;
          height: 100%;
          
          top: 0px;
          left: 0px;
          right: 0px;
          bottom: 0px;
          
          z-index: 300;
          
          background-color: rgba(0, 0, 0, 0.5);

          display: flex;
          justify-content: center;
          align-items: center;
        }
        
      .modalInner {
          width: 300px;
          padding-bottom: 20px;
          
          background-color: white;
          
          box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.7);
          
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        .closeBtn {
        align-self: start;
    }

    .actions {
      display: flex;
      
    }

    .actionBtns {
      width: 55px;
      height: 25px;

      box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);

      margin-left: 5px;
      margin-right: 5px;
    }

 `}</style>
    </div>
  );
};

export default TMFullView;
