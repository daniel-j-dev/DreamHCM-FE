// Modal for creating a new team member
import Image from "next/image";
import { BaseSyntheticEvent } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import closeIcon from "../assets/close_icon.svg";
import { createTeamMember, getAllTeamMembers } from "../api/teamMembers";
import useStore from "../state/store";

const TMCreate = ({ setShowNewTMM }: any) => {
  // State
  const setTeamMembers = useStore((state) => state.setTeamMembers);

  // Function(s)
  const onSubmit = async (v: any, e: BaseSyntheticEvent | undefined) => {
    e?.preventDefault();

    // Format team member object
    const newMember = {
      ...v,
      payType: "Salary",
      hireDate: new Date().toISOString(),
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
        <button className="closeBtn" onClick={() => setShowNewTMM(false)}>
          <Image
            src={closeIcon}
            alt="Close modal menu icon."
            width={25}
            height={25}
          />
        </button>

        <h3>Add a team member</h3>

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

        border-radius: 10px;
      }

      .closeBtn {
        align-self: start;
      }

      form {
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      input {
        margin-bottom: 15px;
        border: 1px solid rgba(0, 0, 0, 0.3);
        padding: 8px;
        font-size: 18px;

        width: 250px;
      }

      .error {
        color: red;
      }
 `}</style>
    </div>
  );
};

export default TMCreate;
