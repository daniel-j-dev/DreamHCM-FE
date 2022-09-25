// Imports
import type { NextPage } from "next";
import Head from "next/head";
import { BaseSyntheticEvent } from "react";
import { useForm } from "react-hook-form";
import bgImg from "../assets/DreamHCM-Background.png";

// Component imports
import SignIn from "../components/SignIn";

// Functions
const Home: NextPage = () => {
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
    <div className="outer">
      <div className="inner">
        <Head>
          <title>DreamHCM - Welcome</title>
          <meta
            name="description"
            content="Welcome to DreamHCM - the tool that meets all your HR needs."
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <h1 className="brandName">
          Dream<span className="brandHCM">HCM</span>
        </h1>
        <h3>Sign in with your email</h3>
        <div>
          <span>{"Don't have an account?"}</span>{" "}
          <button className="switchFormBtn">Sign up</button>
        </div>
        <SignIn />
      </div>
      <style>{`
        .outer {
          width: 100%;
          height: 100%;

          display: flex;
          justify-content: center;
          align-items: center;

          background-image: url(${bgImg.src});
        }

        .inner {
          height: 100%;
          width: 100%;

          background-color: white;

          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .brandName {
          color: #303841;
        }

        .brandHCM {
          color: #2185D5;
        }

        .switchFormBtn {
          color: #2185D5;
        }

        @media only screen and (min-width: 450px) {
          .inner {
            height: 600px;
            width: 400px;

            border-radius: 2px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
          }
        }

      `}</style>
    </div>
  );
};

export default Home;
