import { useLocation } from "react-router-dom";
import "./singlePost.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";

export default function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const { user } = useContext(Context);
  const PF = "https://backblog-qx9z.onrender.com/images/";
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);
  const [file, setFile] = useState(null);

  const handleDelete = async () => {
    try {
      await axios.delete("/posts/" + path, {
        data: { username: user.username },
      });
      window.location.replace("/");
    } catch (error) {}
  };
  const handleUpdate = async () => {
    const updatePost = {
      title,
      desc,
      username: user.username,
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      updatePost.photo = fileName;
      try {
        await axios.post("/upload", data);
      } catch (error) {}
    }
    try {
      await axios.put("/posts/" + path, updatePost);
      // window.location.reload();
      setUpdateMode(false);
    } catch (error) {}
  };
  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("/posts/" + path);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
      console.log(res.data);
    };
    getPost();
  }, [path]);

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {(post.photo || file) && (
          <img
            src={(file && URL.createObjectURL(file)) || PF + post.photo}
            alt=""
            className="singlePostImg"
          />
        )}
        {updateMode ? (
          <div className="imageIcon">
            <label htmlFor="fileInput">
              <i class="writeIcon fa-solid fa-circle-plus"></i>
            </label>
            Add Image
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
        ) : (
          <></>
        )}
        {updateMode ? (
          <input
            type="text"
            value={title}
            className="writeInput"
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className="singlePostTitle">
            {title}
            {post.username === user?.username && (
              <div className="singlePostEdit">
                <i
                  className="singlePostIcon fa-regular fa-pen-to-square"
                  onClick={() => setUpdateMode(true)}
                ></i>
                <i
                  className="singlePostIcon fa-solid fa-trash"
                  onClick={handleDelete}
                ></i>
                {/* <i className="singlePostIcon fa-regular fa-trash-can"></i> */}
                {/* <i className="SinglePostIcon fa-regular fa-square-minus"></i> */}
              </div>
            )}
          </h1>
        )}
        {updateMode ? (
          <></>
        ) : (
          <div className="singlePostInfo">
            <span className="singlePostAuthor">
              Author:&#160;
              <Link to={`/?user=${post.username}`} className="link">
                <b>{post.username}</b>
              </Link>
            </span>
            <span className="singlePostDate">
              {new Date(post.createdAt).toDateString()}
            </span>
          </div>
        )}
        {updateMode ? (
          <textarea
            className="writeInput writeText"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
        ) : (
          <p className="singlePostDesc">{desc}</p>
        )}
      </div>
      {updateMode ? (
        <button className="writeSubmit" onClick={handleUpdate}>
          Update
        </button>
      ) : (
        <></>
      )}
      {/* <button className="writeSubmit">Update</button> */}
    </div>
  );
}
