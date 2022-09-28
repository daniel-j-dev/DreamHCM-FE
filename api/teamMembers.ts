import axios from "axios";

// Check for backend URL
if (!process?.env?.NEXT_PUBLIC_BACKEND_URL)
  throw 'Did not find "NEXT_PUBLIC_BACKEND_URL" inside "process.env"';

// Get all team members
export const getAllTeamMembers = (token: any) => {
  return axios.get(process.env.NEXT_PUBLIC_BACKEND_URL + "/teammember", {
    headers: { authorization: token },
  });
};
