// Modal that displays various information about a Team Member
// ...along with inputs for related CRUD operations
import Image from "next/image";
import { useState, useEffect } from "react";
import closeIcon from "../assets/close_icon.svg";
import useStore from "../state/store";
import { deleteTeamMember, getAllTeamMembers } from "../api/teamMembers";
import { getPayments } from "../api/payments";
import { getSchedule, createWorkDay, deleteWorkDay } from "../api/workDay";
import Calendar from "react-calendar";
import { numToUSD } from "../utility/formatters";

// Component imports
import TMEdit from "./TMEdit";
import TMPay from "./TMPay";

const TMFullView = ({ setShowModal, memberData }: any) => {
  // State
  const setTeamMembers = useStore((state) => state.setTeamMembers);
  const [editing, setEditing] = useState(false); // True if user clicked the "Edit" button
  const [paying, setPaying] = useState(false); // True if user clicked the "Pay" button
  const [payments, setPayments] = useState([]); // payments being fetched from DB by user ID
  const [workDays, setWorkDays] = useState({});

  // Functions
  const handleDelete = async () => {
    // Delete team member
    await deleteTeamMember(memberData._id);

    // Close modal & refresh teamMembers list in state
    setShowModal(false);

    const mems = await getAllTeamMembers();

    setTeamMembers(mems.data);
  };

  // Fetch payments & schedule on component mount
  useEffect(() => {
    // Payments
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

    // Schedule
    getMemberSchedule();
  }, []);

  const getMemberSchedule = () => {
    getSchedule(memberData._id)
      .then((foundDays) => {
        // Format schedule as object for O(n) lookup
        let newSchedule = {};

        for (const d of foundDays.data) {
          const newKey = JSON.stringify(d.workDate);
          // @ts-ignore
          newSchedule[newKey] = true;
        }

        // Add to state
        setWorkDays(newSchedule);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Handles logic when clicking on a date in <Calendar />
  const dateClicked = (date: object) => {
    // Turn date into a string for faster searching
    const dateKey = JSON.stringify(date);

    // If the key exists...
    // @ts-ignore
    if (workDays.hasOwnProperty(dateKey)) {
      // Remove key from DB...
      deleteWorkDay(memberData._id, date)
        .then(() => {
          // Fetch new schedule & update state
          getMemberSchedule();
        })
        .catch((error) => {
          console.log(error);
        });
      return;
    }

    // Otherwise, add new date to DB
    createWorkDay(memberData._id, date)
      .then(() => {
        // Fetch new schedule
        getMemberSchedule();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Sets class name of date tiles to "date-highlight" if they're inside "workDays"
  const setTileClassNames = ({ date }: any) => {
    const wdKey = JSON.stringify(date);
    if (workDays.hasOwnProperty(wdKey)) return "date-highlight";
    return "";
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
          <></>
        )}

        {paying ? (
          <TMPay
            setShowModal={setPaying}
            setPayments={setPayments}
            memberData={memberData}
          />
        ) : (
          <></>
        )}

        {!editing && !paying ? (
          <div className="defaultView">
            <div className="memberDetails">
              <span>Name: {memberData.name}</span>
              <span>Position: {memberData.currentPosition}</span>
              <span>Salary: {numToUSD(memberData.pay)}</span>
              <span>
                Date hired: {new Date(memberData.hireDate).toLocaleDateString()}
              </span>
            </div>

            <Calendar
              onChange={dateClicked}
              // @ts-ignore
              tileClassName={setTileClassNames}
            />

            <div className="paymentsWrap">
              <span>Payments ({payments.length})</span>
              <div className="paymentsScroll">
                {payments.map((e: any, i: number) => (
                  <span className="payments" key={"payment" + i}>{`${new Date(
                    e.dateAdded
                  ).toLocaleDateString()} - ${numToUSD(e.payAmount)}`}</span>
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
              <button className="actionBtns" onClick={() => setPaying(true)}>
                Pay
              </button>
            </div>
          </div>
        ) : (
          <></>
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

        border-radius: 10px;
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

    .defaultView {
      width: 100%;

      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .memberDetails {
      height: 100px;

      padding-left: 15px;
      padding-right: 15px;

      display: flex;
      flex-direction: column;
      justify-content: space-between;

      margin-bottom: 10px;

    }

    .paymentsWrap {

      width: 250px;

      display: flex;
      flex-direction: column;

      box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);

      padding: 10px;

      border-radius: 10px;
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
