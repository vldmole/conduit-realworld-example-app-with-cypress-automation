import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import NavItem from "../NavItem";
import SourceCodeLink from "../SourceCodeLink";
import DropdownMenu from "./DropdownMenu";

function Navbar() {
  const { isAuth } = useAuth();

  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          conduit
        </Link>

        <SourceCodeLink left />

        <ul className="nav navbar-nav pull-xs-right">
          <NavItem text="Home" icon="ion-compose" url="/" />

          {isAuth && (
            <>
              <NavItem data-test="linkNewArticle" text="New Article" icon="ion-compose" url="/editor" />
              <DropdownMenu />
            </>
          )}

          {!isAuth && (
            <>
              <NavItem data-test="linkLogin" text="Login" icon="ion-log-in" url="/login" />
              <NavItem data-test="linkSignup" text="Sign up" url="/register" />
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
export default Navbar;
