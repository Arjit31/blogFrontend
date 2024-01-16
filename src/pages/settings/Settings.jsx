import "./settings.css";
import Sidebar from "../../components/sidebar/Sidebar";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import axios from "axios";

export default function Settings() {
  const { user, dispatch } = useContext(Context);
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const PF = "https://backblog-qx9z.onrender.com/images/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({type:"UPDATE_START"});
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      updatedUser.profilePic = fileName;
      try {
        await axios.post("https://backblog-qx9z.onrender.com/api/upload", data);
    } catch (error) {
    }
}
try {
    console.log(updatedUser);
    const res = await axios.put("https://backblog-qx9z.onrender.com/api/users/" + user._id, updatedUser);
    dispatch({type:"UPDATE_SUCCESS", payload: res.data});
    setSuccess(true);
    // console.log(res);
} catch (error) {
    console.log(error);
    dispatch({type:"UPDATE_FAILURE"});
    }
  };

  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsUpdateTitle">Update your account</span>
          <span className="settingsDeleteTitle">Delete your account</span>
        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className="settingsPP">
            {(user.profilePic || file) ? (<img src={ (file && URL.createObjectURL(file)) || PF + user.profilePic} alt="" />) : (
              <span className="blank">
                <div>Profile</div>
                <div>Picture</div>
              </span>
            )}
            <label htmlFor="fileInput">
              <i className="settingsPPIcon fa-solid fa-camera"></i>
            </label>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <label>Username</label>
          <input
            type="text"
            placeholder={user.username}
            onChange={(e) => setUsername(e.target.value)}
            readOnly
            className="notAllow"
          />
          <label>E-mail</label>
          <input
            type="email"
            placeholder={user.email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="settingsSubmit" type="submit">Update</button>
          {success && (<span className="updatedText">Profile has been updated...</span>)}
        </form>
      </div>
      <Sidebar />
    </div>
  );
}
