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
    // Skip if user data is already in state
    if (user?.token?.length > 0) return;

    // If user data exists in localStorage...
    if ("user" in window.localStorage) {
      const savedUser = JSON.parse(
        localStorage.getItem("user") || JSON.stringify(user)
      );

      // Save data to state
      setUser(savedUser);
      return;
    }

    // Otherwise, redirect to sign in / sign up page
    if (!user?.token || user?.token?.length < 1) {
      router.push("/");
    }
  }, []);

  return <>{children}</>;
};

export default PrivateRoute;
