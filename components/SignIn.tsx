// Imports
import type { NextPage } from "next";
import { BaseSyntheticEvent } from "react";
import { useForm } from "react-hook-form";

// Functions
const SignIn: NextPage = () => {
  const onSubmit = (v: Object, e: BaseSyntheticEvent | undefined) => {
    e?.preventDefault();
    console.log(v);
  };

  // Form / input validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // JSX
  return (
    <form
      className="inputForm"
      onSubmit={handleSubmit((values, event) => onSubmit(values, event))}
    >
      <input
        type="text"
        placeholder="Enter your email"
        {...register("email", { required: true })}
      ></input>
      <input
        type="password"
        placeholder="Password"
        {...register("password", { required: true })}
      ></input>
      <button className="submitBtn">Sign in</button>
      <style>{`
            .inputForm {
              display: flex;
              flex-direction: column;
              justify-content: top;
              align-items: center;
    
              height: 150px;
    
              margin-top: 20px;
    
              width: 300px;
            }
    
            input {
              margin-bottom: 15px;
              border: 1px solid rgba(0, 0, 0, 0.3);
              padding: 8px;
              font-size: 18px;
    
              width: 100%;
            }
    
            .submitBtn {
              color: white;
              background-color: #2185D5;
              border-radius: 10px;
    
              height: 50px;
              width: 100%;
    
              font-size: 18px;
            }
          `}</style>
    </form>
  );
};

export default SignIn;
