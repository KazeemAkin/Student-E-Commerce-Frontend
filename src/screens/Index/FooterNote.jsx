import { NavLink } from "react-router-dom";
import { ROUTE_ABOUT_US } from "../../config/constants";

function FooterNote() {
  return (
    <div className="footer-note">
      <div className="left">List.Shop.Done</div>
      <div className="right">
        <NavLink to={ROUTE_ABOUT_US} className="nav-link">
          Start Shopping
        </NavLink>
      </div>
    </div>
  );
}

export default FooterNote;
