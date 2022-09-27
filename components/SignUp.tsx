// Imports
import type { NextPage } from "next";
import { BaseSyntheticEvent } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUp, signIn } from "../api/users";
import useStore from "../state/store";
import { useRouter } from "next/router";

const SignUp: NextPage = () => {
  // State
  const setUser = useStore((state) => state.setUser);

  // Setup router
  const router = useRouter();

  // Functions
  const onSubmit = async (v: any, e: BaseSyntheticEvent | undefined) => {
    e?.preventDefault();

    try {
      // Attempt creating an account
      const newUser = {
        email: v?.email,
        password: v?.password,
      };
      await signUp(newUser);

      // If successful, sign in
      const createdUser = await signIn(newUser);

      // Add token to localStorage and state
      localStorage.setItem(
        "user",
        JSON.stringify({ user: { token: createdUser.data } })
      );
      setUser({ token: createdUser.data });

      // Redirect to /dashboard
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
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
    passwordConfirm: yup
      .string()
      .required("Please confirm your password.")
      .oneOf([yup.ref("password")], "Password does not match."),
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

      <input
        type="password"
        placeholder="Confirm password"
        {...register("passwordConfirm", { required: true })}
      ></input>

      {/* Password confirmation input error messages */}
      {errors?.passwordConfirm?.message ? (
        <span className="error">{`${errors?.passwordConfirm?.message}`}</span>
      ) : (
        <></>
      )}

      <button className="submitBtn">Sign up</button>
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

export default SignUp;
