import { Navigate, Outlet } from "react-router-dom";
import { useTask } from "../Context/TaskContext";
const PrivateRoute = () => {
  const { TaskApp } = useTask();
  if (TaskApp.user) return <Outlet />;
  return <Navigate to="/login" />;
};

export default PrivateRoute;
