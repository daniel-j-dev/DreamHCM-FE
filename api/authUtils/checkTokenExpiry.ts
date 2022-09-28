import isJwtTokenExpired from "jwt-check-expiry";

const checkTokenExpiry = () => {
  // Check if token is saved in localStorage
  const userString = localStorage.getItem("user") || null;
  if (!userString) return;

  try {
    // Check if token is expired
    const { token } = JSON.parse(userString);
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
