import { NavLink } from "react-router-dom";
import "./ListTitleSubtitle.css";

const ListTitleSubtitle = ({
  borderColor,
  date,
  img,
  title,
  time,
  subtitle,
  link,
}) => {
  return (
    <NavLink to={link} className="list_title_link">
      <div className="list_item">
        {img && <img src={img} alt="logo" />}
        {date && (
          <div
            className="side_box"
            style={{ borderRight: "3px solid " + borderColor }}
          >
            <span className="date">{date}</span>
            <span className="time">{time}</span>
          </div>
        )}
        <div>
          <span className="list_item_title">{title}</span>
          <span className="list_item_subtitle">{subtitle}</span>
        </div>
      </div>
    </NavLink>
  );
};

export default ListTitleSubtitle;
