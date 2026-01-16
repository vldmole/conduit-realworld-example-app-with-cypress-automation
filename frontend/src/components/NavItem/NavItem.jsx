import { NavLink } from "react-router-dom";

function NavItem({ icon, text, url, state, ...props }) {
  const activeClass = ({ isActive }) => `nav-link ${isActive ? "active" : ""}`;

  return (
    <li className="nav-item">
      <NavLink className={activeClass} end state={state} to={url} {...props}>
        {icon && <i className={icon}></i>} {text}
      </NavLink>
    </li>
  );
}

export default NavItem;
