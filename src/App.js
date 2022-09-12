import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TaskProvider } from "./Context/TaskContext";
import Home from "./Pages/Home/Home";
import Landing from "./Pages/Landing/Landing";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";
import PrivateRoute from "./Routes/PrivateRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditTask from "./Pages/EditTask/EditTask";
import PublicRoute from "./Routes/PublicRoute";
import NotFound from "./Pages/NotFound/NotFound";
function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <TaskProvider>
          <Routes>
            <Route element={<PublicRoute />}>
              <Route path="/" element={<Landing />} />
              <Route path="/register" element={<Signup />} />
              <Route path="/login" element={<Login />} />
            </Route>
            <Route element={<PrivateRoute />}>
              <Route path="/home" element={<Home />} />
              <Route path="/edit/:id" element={<EditTask />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TaskProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
