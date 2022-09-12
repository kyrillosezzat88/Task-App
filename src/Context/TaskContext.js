import { onAuthStateChanged } from "firebase/auth";
import { useReducer, useContext, useEffect } from "react";
import { createContext } from "react";
import { auth } from "../Apis/Firebase-Config";
import { logedinUser } from "./Actions/Auth-Actions";
import { TaskReducer } from "./Reducers/TaskReducer";
const initState = {
  user: {},
  Tasks: [],
  filtrated: [],
  isLoading: false,
  isError: false,
};

export const TaskContext = createContext(initState);

export const TaskProvider = ({ children }) => {
  const [TaskApp, dispatch] = useReducer(TaskReducer, initState);
  
  // to get user if loged in before
  useEffect(() => {
    const LogedUser = onAuthStateChanged(auth, (currentUser) => {
      dispatch(logedinUser(currentUser));
    });
    return () => {
      LogedUser();
    };
  }, []);
  return (
    <TaskContext.Provider value={{ TaskApp, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};
export const useTask = () => {
  return useContext(TaskContext);
};
