import axios from "axios";
import getToken from "./authUtils/getToken";
import checkTokenExpiry from "./authUtils/checkTokenExpiry";

// Check for backend URL
if (!process?.env?.NEXT_PUBLIC_BACKEND_URL)
  throw 'Did not find "NEXT_PUBLIC_BACKEND_URL" inside "process.env"';

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

// Get all team members
export const getAllTeamMembers = () => {
  checkTokenExpiry();
  const token = getToken();

  return axios.get(baseURL + "/teammember", {
    headers: { authorization: token },
  });
};

// Create a new team member
export const createTeamMember = (newMember: any) => {
  checkTokenExpiry();
  const token = getToken();

  return axios.post(baseURL + "/teammember", newMember, {
    headers: { authorization: token },
  });
};
