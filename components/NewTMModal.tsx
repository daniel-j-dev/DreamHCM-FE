// Modal for creating a new team member
import Image from "next/image";
import { BaseSyntheticEvent } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import closeIcon from "../assets/close_icon.svg";
import { createTeamMember, getAllTeamMembers } from "../api/teamMembers";
import useStore from "../state/store";

const NewTMModal = ({ setShowNewTMM }: any) => {
  // State
  const setTeamMembers = useStore((state) => state.setTeamMembers);

  // Function(s)
  const onSubmit = async (v: any, e: BaseSyntheticEvent | undefined) => {
    e?.preventDefault();

    // Format team member object
    const newMember = {
      ...v,
      payType: "Salary",
      hireDate: Date.now(),
    };

    try {
      // Create
      await createTeamMember(newMember);

      // Close modal & refetch teamMembers
      setShowNewTMM(false);

      const mems = await getAllTeamMembers();

      setTeamMembers(mems.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Form / input validation
  let inputSchema = yup.object().shape({
    name: yup
      .string()
      .required("A name is required.")
      .min(1, "Name must be at least 1 character long.")
      .max(100, "Name can't exceed 100 characters."),
    currentPosition: yup
      .string()
      .required("Current position is required.")
      .min(1, "Current position must be at least 1 character long.")
      .max(100, "Current position can't exceed 100 characters."),
    pay: yup
      .number()
      .required("Pay is required.")
      .min(0, "Pay must be at least 0.")
      .max(1000000000, "Pay can't exceed 1000000000."),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(inputSchema),
  });

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
        <form
          onSubmit={handleSubmit((values, event) => onSubmit(values, event))}
        >
          <input
            type="text"
            placeholder="Name"
            {...register("name", { required: true })}
          />
          {/* Name input error messages */}
          {errors?.name?.message ? (
            <span className="error">{`${errors?.name?.message}`}</span>
          ) : (
            <></>
          )}
          <input
            type="text"
            placeholder="Current position"
            {...register("currentPosition", { required: true })}
          />
          {/* Current position input error messages */}
          {errors?.currentPosition?.message ? (
            <span className="error">{`${errors?.currentPosition?.message}`}</span>
          ) : (
            <></>
          )}
          <input
            type="number"
            placeholder="Annual pay"
            {...register("pay", { required: true })}
          />
          {/* Pay input error messages */}
          {errors?.pay?.message ? (
            <span className="error">{`${errors?.pay?.message}`}</span>
          ) : (
            <></>
          )}
          <button>Create</button>
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

      .error {
        color: red;
      }
 `}</style>
    </div>
  );
};

export default NewTMModal;
