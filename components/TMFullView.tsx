// Modal that displays various information about a Team Member
// ...along with inputs for related CRUD operations
import Image from "next/image";
import { useState, useEffect } from "react";
import closeIcon from "../assets/close_icon.svg";
import useStore from "../state/store";
import TMEdit from "./TMEdit";
import { deleteTeamMember, getAllTeamMembers } from "../api/teamMembers";
import { getPayments } from "../api/payments";

const TMFullView = ({ setShowModal, memberData }: any) => {
  // State
  const setTeamMembers = useStore((state) => state.setTeamMembers);
  const [editing, setEditing] = useState(false); // True if you clicked the "edit" button
  const [payments, setPayments] = useState([]); // payments being fetched from DB by user ID

  // Functions
  const handleDelete = async () => {
    // Delete team member
    await deleteTeamMember(memberData._id);

    // Close modal & refresh teamMembers list in state
    setShowModal(false);

    const mems = await getAllTeamMembers();

    setTeamMembers(mems.data);
  };

  // Fetch payments on component mount
  useEffect(() => {
    getPayments(memberData._id)
      .then((foundPayments) => {
        // Sort data (by most recent?)
        foundPayments.data.reverse();
        // Set state
        setPayments(foundPayments.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
          <div>
            <div className="memberDetails">
              <span>Name: {memberData.name}</span>
              <span>Position: {memberData.currentPosition}</span>
              <span>Salary: {memberData.pay}</span>
              <span>
                Date hired: {new Date(memberData.hireDate).toLocaleDateString()}
              </span>
            </div>

            <div className="paymentsWrap">
              <span>Payments ({payments.length})</span>
              <div className="paymentsScroll">
                {payments.map((e: any, i: number) => (
                  <span className="payments" key={"payment" + i}>{`${new Date(
                    e.dateAdded
                  ).toLocaleDateString()} - $${e.payAmount}`}</span>
                ))}
              </div>
            </div>

            <div className="actions">
              <button className="actionBtns" onClick={() => handleDelete()}>
                Delete
              </button>
              <button className="actionBtns" onClick={() => setEditing(true)}>
                Edit
              </button>
            </div>
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
          
          background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);
          
          box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.7);
          
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        .closeBtn {
        align-self: start;
    }

    .actions {
      width: 100%;
      display: flex;
      justify-content: center;
      margin-top: 15px;
      
    }

    .actionBtns {
      width: 55px;
      height: 25px;

      box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);

      margin-left: 5px;
      margin-right: 5px;
    }

    .memberDetails {
      width: 100%;
      height: 100%;

      padding-left: 15px;
      padding-right: 15px;
      display: flex;
      flex-direction: column;

      //flex-wrap: wrap;

    }

    .paymentsWrap {
      display: flex;
      flex-direction: column;

      margin-top: 15px;
    }

    .paymentsScroll {
      height: 50px;
      overflow-y:auto;

      display: flex;
      flex-direction: column;
    }

 `}</style>
    </div>
  );
};

export default TMFullView;
