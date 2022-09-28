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

// Update a team member
export const updateTeamMember = (updatedMember: any) => {
  checkTokenExpiry();
  const token = getToken();

  return axios.put(baseURL + "/teammember", updatedMember, {
    headers: { authorization: token },
  });
};

// Delete a team member
export const deleteTeamMember = (_id: string) => {
  checkTokenExpiry();
  const token = getToken();

  return axios.delete(baseURL + "/teammember", {
    data: { _id: _id },
    headers: { Authorization: token },
  });
};
