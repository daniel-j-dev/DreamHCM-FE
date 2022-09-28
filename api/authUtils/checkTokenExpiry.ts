import isJwtTokenExpired from "jwt-check-expiry";
import getToken from "./getToken";

const checkTokenExpiry = () => {
  // Check if token is saved in localStorage
  const token = getToken();
  if (token === "") return;

  try {
    // Check if token is expired
    if (!isJwtTokenExpired(token)) return;
    // If it is expired, clear localStorage...
    localStorage.clear();

    // Redirect to sign in / sign up page (hard refresh)
    window.location.href = "/";
  } catch (error) {
    // If "isJwtTokenExpired" throws an error, the token isn't valid.
    console.log(error);
    window.location.href = "/";
  }
};

export default checkTokenExpiry;
