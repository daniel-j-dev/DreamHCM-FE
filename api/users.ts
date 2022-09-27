const axios = require("axios").default;
// CommonJS for TypeScript support

// Check for backend URL
if (!process?.env?.NEXT_PUBLIC_BACKEND_URL)
  throw 'Did not find "NEXT_PUBLIC_BACKEND_URL" inside "process.env"';

type UserData = {
  email: string;
  password: string;
};

export const signIn = (formValues: Object) => {
  // Check if "formValues" includes both an email and a password
  if (!(formValues as UserData)) {
    return;
  }

  return axios.post(
    process.env.NEXT_PUBLIC_BACKEND_URL + "/user/signin",
    formValues
  );
};

export const signUp = async (formValues: Object) => {
  if (!(formValues as UserData)) {
    return;
  }

  return axios.post(
    process.env.NEXT_PUBLIC_BACKEND_URL + "/user/signup",
    formValues
  );
};
