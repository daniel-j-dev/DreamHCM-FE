import axios from "axios";
import getToken from "./authUtils/getToken";
import checkTokenExpiry from "./authUtils/checkTokenExpiry";

// Check for backend URL
if (!process?.env?.NEXT_PUBLIC_BACKEND_URL)
  throw 'Did not find "NEXT_PUBLIC_BACKEND_URL" inside "process.env"';

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

// Get all payments for a member
export const getPayments = (id: string) => {
  checkTokenExpiry();
  const token = getToken();

  return axios.get(baseURL + "/payment", {
    params: { teamMemberId: id },
    headers: { authorization: token },
  });
};

// Create a new payment
export const createPayment = (payment: any) => {
  checkTokenExpiry();
  const token = getToken();

  return axios.post(baseURL + "/payment", payment, {
    headers: { authorization: token },
  });
};
