import "./sidebar.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get("/categories");
      setCats(res.data);
    };
    getCats();
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebarItems">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
          {/* <li className="sidebarListItems">music</li>
        <li className="sidebarListItems">lifestyle</li> */}
          {cats.map((c) => (
            <Link to={`/?cat=${c.name}`} className="link">
              <li className="sidebarListItems">{c.name}</li>
            </Link>
          ))}
        </ul>
      </div>
      <div className="sidebarItems">
        <span className="sidebarTitle">ABOUT ME</span>
        <img
          className="sidebarImg"
          src="https://freepngimg.com/save/22654-man/594x600"
          alt=""
        />
        <p>
          Hey there! I'm Arjit, a web developer, and I'm excited to have
          you join our blogging community. This space is all about sharing ideas
          and experiences. Your unique perspective matters, so let's connect,
          learn, and inspire each other through your blogs. Don't hold back—your
          voice adds richness to our community. Happy blogging!
          {/* Hello! I'm
          Arjit, a passionate web developer, and I'm thrilled to welcome you to
          our vibrant blogging community. As someone deeply immersed in the
          world of web development, I understand the power of sharing ideas and
          experiences. This blog space is not just about me; it's about creating
          a platform for all of us to connect, learn, and inspire one another.
          Your unique perspective and insights can contribute immensely to the
          richness of our community. So, don't hesitate—let your voice be heard!
          Share your thoughts, experiences, and expertise through your blogs.
          Together, we can foster a space where creativity flourishes, and
          knowledge is freely exchanged. Happy blogging! */}
        </p>
      </div>
      <div className="sidebarItems">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
          <i className="sidebarIcon fa-brands fa-facebook"></i>
          <i className="sidebarIcon fa-brands fa-twitter"></i>
          <i className="sidebarIcon fa-brands fa-pinterest"></i>
          <i className="sidebarIcon fa-brands fa-instagram"></i>
        </div>
      </div>
    </div>
  );
}
