import { Outlet, Navigate } from "react-router-dom";
import { useTask } from "../Context/TaskContext";

const PublicRoute = () => {
  const { TaskApp } = useTask();
  if (TaskApp.user) return <Navigate to={"/home"} />;
  return <Outlet />;
};

export default PublicRoute