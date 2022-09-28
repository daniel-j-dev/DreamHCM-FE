// Modal for creating a new team member
import Image from "next/image";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import closeIcon from "../assets/close_icon.svg";

const NewTMModal = ({ setShowNewTMM }: any) => {
  // Function(s)
  const handleSubmit = (e: any) => {
    e.preventDefault();
  };
  // JSX
  return (
    <div className="modalOuter">
      <div className="modalInner">
        <button onClick={() => setShowNewTMM(false)}>
          <Image
            src={closeIcon}
            alt="Close modal menu icon."
            width={25}
            height={25}
          />
        </button>
        <form>
          <input type="text" placeholder="Name" />
          <input type="text" placeholder="Current position" />
          <input type="number" placeholder="Annual pay" />
          <button onClick={(e) => handleSubmit(e)}>Create</button>
        </form>
      </div>
      <style>{`
      .modalOuter {
        position: fixed;
        width: 100%;
        height: 100%;

        top: 0px;

        z-index: 300;

        background-color: rgba(0, 0, 0, 0.5);

        display: flex;
        justify-content: center;
        align-items: center;
      }

      .modalInner {
        width: 300px;
        height: 300px;
        background-color: white;

        box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.7);
      }
 `}</style>
    </div>
  );
};

export default NewTMModal;
