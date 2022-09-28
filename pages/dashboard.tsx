import type { NextPage } from "next";
import Head from "next/head";

// Component imports
import PrivateRoute from "../components/PrivateRoute";
import Header from "../components/Header";
import TeamMembers from "../components/TeamMembers";

const Dashboard: NextPage = () => {
  return (
    <PrivateRoute>
      <div className="dashboardWrap">
        <Head>
          <title>DreamHCM - Dashboard</title>
        </Head>

        <Header />

        <TeamMembers />

        <style>{`
  .dashboardWrap {
    height: 100%;
    width: 100%;
  }
 
 `}</style>
      </div>
    </PrivateRoute>
  );
};

export default Dashboard;
