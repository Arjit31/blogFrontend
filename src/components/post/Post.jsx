import "./post.css";
import { Link } from "react-router-dom";

export default function Post({ post }) {
  const PF = "https://backblog-qx9z.onrender.com/images/";
  return (
    <Link to={`/post/${post._id}`} className="link">
      <div className="post">
        {post.photo && <img className="postImg" src={PF + post.photo} alt="" />}
        <div className="postInfo">
          <div className="postCats">
            {Array.isArray(post.categories)
              ? // If categories is an array of strings
                post.categories.map((category, index) => (
                  <span key={index} className="postCat">
                    {category}
                  </span>
                ))
              : // If categories is an array of objects with name property
                post.categories.map((c) => (
                  <span key={c._id} className="postCat">
                    {c.name}
                  </span>
                ))}
          </div>
          <span className="postTitle">{post.title}</span>
          <span className="postDate">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        <p className="postDesc">{post.desc}</p>
      </div>
    </Link>
  );
}
