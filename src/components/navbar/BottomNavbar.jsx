import { NavLink } from "react-router-dom";
import { ROUTE_HOME } from "../../config/constants";
import colors from "../../config/colors";

function BottomNavbar() {
  return (
    <section className="bottom-nav">
      <ul>
        <li>
          <NavLink
            to={ROUTE_HOME}
            style={{ textDecoration: "none", color: colors.white }}
          >
            <span>Books</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to={ROUTE_HOME}
            style={{ textDecoration: "none", color: colors.white }}
          >
            <span>Furnitures</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to={ROUTE_HOME}
            style={{ textDecoration: "none", color: colors.white }}
          >
            <span>Techwares</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to={ROUTE_HOME}
            style={{ textDecoration: "none", color: colors.white }}
          >
            <span>Kitchenwares</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to={ROUTE_HOME}
            style={{ textDecoration: "none", color: colors.white }}
          >
            <span>Miscelenous</span>
          </NavLink>
        </li>
      </ul>
    </section>
  );
}

export default BottomNavbar;
