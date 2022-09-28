import create from "zustand";

// Only token is needed for this project.
// We won't be the displaying user's info such as email, name, etc
interface StoreType {
  user: {
    token: string;
  };
  setUser: (newUser: any) => void;
  teamMembers: any;
  setTeamMembers: (newMember: any) => void;
}

const useStore = create<StoreType>((set: Function) => ({
  user: {
    token: "",
  },
  setUser: (newUser: any) => {
    set(() => ({ user: newUser }));
  },
  teamMembers: [],
  setTeamMembers: (newMember: any) => {
    set(() => ({ teamMembers: newMember }));
  },
}));

export default useStore;
