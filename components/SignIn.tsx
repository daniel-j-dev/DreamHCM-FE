// Imports
import type { NextPage } from "next";
import { BaseSyntheticEvent } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { signIn } from "../api/users";
import useStore from "../state/store";
import { useRouter } from "next/router";

const SignIn: NextPage = () => {
  // State
  const setUser = useStore((state) => state.setUser);

  // Setup router
  const router = useRouter();

  // Functions
  const onSubmit = (v: Object, e: BaseSyntheticEvent | undefined) => {
    e?.preventDefault();

    // Sign in
    signIn(v)
      .then((res: any) => {
        // Add token to localStorage and state
        localStorage.setItem("user", JSON.stringify({ token: res.data }));
        setUser({ token: res.data });

        // Redirect to dashboard
        router.push("/dashboard");
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  // Form / input validation
  let inputSchema = yup.object().shape({
    email: yup
      .string()
      .required("An email address is required.")
      .email("Provide a valid email address."),
    password: yup
      .string()
      .required("A password is required.")
      .min(6, "Password must be at least 6 characters."),
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
    <form
      className="inputForm"
      onSubmit={handleSubmit((values, event) => onSubmit(values, event))}
    >
      <input
        type="text"
        placeholder="Enter your email"
        {...register("email", { required: true })}
      ></input>

      {/* Email input error messages */}
      {errors?.email?.message ? (
        <span className="error">{`${errors?.email?.message}`}</span>
      ) : (
        <></>
      )}

      <input
        type="password"
        placeholder="Password"
        {...register("password", { required: true })}
      ></input>

      {/* Password input error messages */}
      {errors?.password?.message ? (
        <span className="error">{`${errors?.password?.message}`}</span>
      ) : (
        <></>
      )}

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
              min-height: 42px;
              
              width: 100%;
    
              font-size: 18px;
            }

            .error {
                color: red;

                align-self: start;

                margin-bottom: 15px;
            }
          `}</style>
    </form>
  );
};

export default SignIn;
