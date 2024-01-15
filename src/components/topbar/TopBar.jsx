import { Link } from "react-router-dom";
import "./topbar.css";
import { useContext } from "react";
import { Context } from "../../context/Context";

export default function TopBar() {
  const { user, dispatch } = useContext(Context);
  const PF = "https://backblog-qx9z.onrender.com/images/";
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <div className="top">
      <div className="topLeft">
        {user ? (
          <Link to={"/settings"}>
            <img className="topImg" src={PF + user.profilePic} alt="profile" />
          </Link>
        ) : (
          <>
            <ul className="topList">
              <li className="topListItems">
                <Link className="link" to={"/login"}>
                  <div className="loginButtons">
                    <button className="loginButton">Login</button>
                  </div>
                </Link>
              </li>
              <li className="topListItems">
                <Link className="link" to={"/register"}>
                  <div className="loginButtons">
                    <button className="loginRegisterButton">Register</button>
                  </div>
                </Link>
              </li>
            </ul>
          </>
        )}

        <i class="topIcon fa-solid fa-blog"> Blogs</i>
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItems">
            <Link className="link" to={"/"}>
              HOME
            </Link>
          </li>
          <li className="topListItems">
            <Link className="link" to={"/"}>
              ABOUT
            </Link>
          </li>
          <li className="topListItems">
            <Link className="link" to={"/"}>
              CONTACT
            </Link>
          </li>
          <li className="topListItems">
            <Link className="link" to={"/write"}>
              WRITE
            </Link>
          </li>
          <li className="topListItems" onClick={handleLogout}>
            {user && "LOGOUT"}
          </li>
          <li className="topListItems">
            <i className="topSearchIcon fa-solid fa-magnifying-glass"></i>
          </li>
        </ul>
      </div>
      <div className="topRight">
        <i className="topIcon fa-brands fa-facebook"></i>
        <i className="topIcon fa-brands fa-twitter"></i>
        <i className="topIcon fa-brands fa-pinterest"></i>
        <i className="topIcon fa-brands fa-instagram"></i>
      </div>
    </div>
  );
}
