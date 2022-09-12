import { Link } from "react-router-dom";
import Logo from "../../Assets/Images/logo.png";
import "./Navbar.scss";
import Profile from "../../Assets/Images/profile.png";
import { signOut } from "firebase/auth";
import { auth } from "../../Apis/Firebase-Config";
import { useTask } from "../../Context/TaskContext";
import { Signout } from "../../Context/Actions/Auth-Actions";
function Navbar({ logedin, justLogo }) {
  const {dispatch} = useTask()
  // logout user
  const Logout = async () => {
    await signOut(auth).then(() => dispatch(Signout()));
  };

  // check jutlogo prop to show just logo in singin , signup pages
  if (justLogo)
    return (
      <nav>
        <Link to="/" className="logo">
          <img src={Logo} alt="Task_Logo" width="40px" />
          <h2>Task</h2>
        </Link>
      </nav>
    );
  return (
    <nav>
      <Link to="/home" className="logo">
        <img src={Logo} alt="Task_Logo" width="40px" />
        <h2>Task</h2>
      </Link>
      {!logedin ? (
        <ul>
          <Link to="/login">
            <li className="btn">Log in</li>
          </Link>
          <Link to="/register">
            <li className="btn btn-primary">Get Started</li>
          </Link>
        </ul>
      ) : (
        <div className="flex items-center">
          <span className="mr-3 text-lg cursor-pointer" onClick={Logout}>
            Logout
          </span>
          <img src={Profile} alt="Profile" width="40px" />
        </div>
      )}
    </nav>
  );
}

export default Navbar;
