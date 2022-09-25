import type { NextPage } from "next";
import Head from "next/head";
import { FormEvent } from "react";
import bgImg from "../assets/DreamHCM-Background.png";

const Home: NextPage = () => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

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
        <form className="inputForm" onSubmit={(e) => handleSubmit(e)}>
          <input type="text" placeholder="Enter your email"></input>
          <input type="password" placeholder="Password"></input>
          <button className="submitBtn">Sign in</button>
        </form>
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
