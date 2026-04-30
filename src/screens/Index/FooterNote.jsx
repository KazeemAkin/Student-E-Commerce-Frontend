import { NavLink } from "react-router-dom";
import { ROUTE_ABOUT_US } from "../../config/constants";

function FooterNote({ style = {}, rightBtnStyle = {}, linkStyle = {} }) {
  return (
    <div className="footer-note" style={style}>
      <div className="left">List.Shop.Done</div>
      <div className="right" style={rightBtnStyle}>
        <NavLink to={ROUTE_ABOUT_US} className="nav-link" style={linkStyle}>
          Start Shopping
        </NavLink>
      </div>
    </div>
  );
}

export default FooterNote;
