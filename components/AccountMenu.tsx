import { useRouter } from "next/router";
import useStore from "../state/store";

const AccountMenu = () => {
  // State
  const setUser = useStore((state) => state.setUser);

  // Setup router
  const router = useRouter();

  // Function(s)
  const handleSignOut = (e: any) => {
    e.stopPropagation();

    // Clear localStorage, reset user state, and redirect to the sign in page
    localStorage.clear();
    setUser({});
    router.push("/");
  };

  // JSX
  return (
    <div className="accMenu">
      <button onClick={(e) => handleSignOut(e)}>Sign out</button>
      <style>{`
    .accMenu {
        position: absolute;
        right: 0px;
        width: 100px;
        height: 50px;
        background-color: white;

        z-index: 9999;

        //border-radius: 20px;

        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;


        box-shadow: 0px 0px 4px black;
    }

    button {
      color: red;
    }
 `}</style>
    </div>
  );
};

export default AccountMenu;
