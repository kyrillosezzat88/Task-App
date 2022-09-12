import Navbar from "../../Components/Navbar/Navbar";
import "./Landing.scss";
import Hero from "../../Assets/Images/home-hero.jpg";
import Hero_1 from "../../Assets/Images/home-hero-1.jpg";
import { Link } from "react-router-dom";
function Landing() {
  return (
    <>
      <Navbar />
      <section className="Landing">
        <div className="Landing_Left">
          <h1 className="Landing_Left_Title">
            Make work <br /> work for you.
          </h1>
          <p className="Landing_Left_Desc">
            From the small stuff to the big picture, Task organizes work so
            teams know what to do, why it matters, and how to get it done.
          </p>
          <div className="Landing_Left_buttons">
            <Link to='/register'>
              <button className="btn btn-primary">Get Started</button>
            </Link>
            <button className="btn ">Watch Video</button>
          </div>
        </div>
        <div className="Landing_Right">
          <img src={Hero} alt="Home_Hero" />
          <img src={Hero_1} alt="Home_Hero" />
        </div>
      </section>
    </>
  );
}

export default Landing;
