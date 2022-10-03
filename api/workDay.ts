import axios from "axios";
import getToken from "./authUtils/getToken";
import checkTokenExpiry from "./authUtils/checkTokenExpiry";

// Check for backend URL
if (!process?.env?.NEXT_PUBLIC_BACKEND_URL)
  throw 'Did not find "NEXT_PUBLIC_BACKEND_URL" inside "process.env"';

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

// Get schedule for a team member
export const getSchedule = (teamMemberId: any) => {
  checkTokenExpiry();
  const token = getToken();

  return axios.get(baseURL + "/schedule", {
    params: { teamMemberId: teamMemberId },
    headers: { authorization: token },
  });
};

// Create a new work day
export const createWorkDay = (teamMemberId: any, workDate: any) => {
  checkTokenExpiry();
  const token = getToken();

  return axios.post(
    baseURL + "/schedule",
    { teamMemberId: teamMemberId, workDate: workDate },
    {
      headers: { authorization: token },
    }
  );
};

// Delete a work day
export const deleteWorkDay = (teamMemberId: any, workDate: any) => {
  checkTokenExpiry();
  const token = getToken();

  return axios.delete(baseURL + "/schedule", {
    data: { teamMemberId: teamMemberId, workDate: workDate },
    headers: { authorization: token },
  });
};
