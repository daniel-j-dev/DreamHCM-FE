import type { NextPage } from "next";
import Head from "next/head";

// Component imports
import PrivateRoute from "../components/PrivateRoute";

const Dashboard: NextPage = () => {
  return (
    <PrivateRoute>
      <div>
        <Head>
          <title>DreamHCM - Dashboard</title>
        </Head>

        <style>{`
 
 `}</style>
      </div>
    </PrivateRoute>
  );
};

export default Dashboard;
