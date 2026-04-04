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
            <span>Tech-wares</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to={ROUTE_HOME}
            style={{ textDecoration: "none", color: colors.white }}
          >
            <span>Kitchenware</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to={ROUTE_HOME}
            style={{ textDecoration: "none", color: colors.white }}
          >
            <span>Sportwear</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to={ROUTE_HOME}
            style={{ textDecoration: "none", color: colors.white }}
          >
            <span>Dinnerwares</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to={ROUTE_HOME}
            style={{ textDecoration: "none", color: colors.white }}
          >
            <span>Miscellaneuos</span>
          </NavLink>
        </li>
      </ul>
    </section>
  );
}

export default BottomNavbar;
