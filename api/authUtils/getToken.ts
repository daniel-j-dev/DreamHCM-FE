const getToken = () => {
  try {
    const userString = localStorage.getItem("user");
    const { token } = JSON.parse(userString || "");
    return token;
  } catch (error) {
    // Will usually error because window.localStorage hasn't loaded yet
    console.log(error);
  }
  return "";
};

export default getToken;
