import { Link } from "react-router-dom";
import dateFormatter from "../../helpers/dateFormatter";
import Avatar from "../Avatar";

function ArticleMeta({ author, children, createdAt }) {
  const { bio, followersCount, following, image, username } = author || {};

  return (
    <div className="article-meta">
      <Link
        data-test = "linkProfile"
        state={{ bio, followersCount, following, image }}
        to={`/profile/${username}`}
      >
        <Avatar alt={username} src={image} />
      </Link>
      <div className="info">
        <Link
          data-test = "linkAuthor"
          className="author"
          state={{ bio, followersCount, following, image }}
          to={`/profile/${username}`}
        >
          {username}
        </Link>
        <span data-test = "linkCreationDate" className="date">{dateFormatter(createdAt)}</span>
      </div>
      {children}
    </div>
  );
}

export default ArticleMeta;
