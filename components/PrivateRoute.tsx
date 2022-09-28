import { useEffect } from "react";
import useStore from "../state/store";
import { useRouter } from "next/router";

const PrivateRoute = ({ children }: any) => {
  // State
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);

  // Setup router
  const router = useRouter();

  // If user isn't logged in, redirect to signin / signup page
  useEffect(() => {
    // Skip the logic below if already logged in
    if (user.token.length > 0) return;

    // If user data is in localStorage, save it to state.
    if ("user" in localStorage) {
      const savedUser = localStorage.getItem("user");

      setUser(JSON.parse(savedUser || ""));

      return;
    }

    // Otherwise, redirect to sign in / sign up page
    router.push("/");
  }, []);

  return <>{children}</>;
};

export default PrivateRoute;
