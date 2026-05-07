import React from "react";
import emptyIcon from "../../assets/customTags/empty-icon.png";

export default function EmptyDiv() {
  return (
          <div className="empty-container">
            <img src={emptyIcon} alt="" />
            <span>Nothing to see here.</span>
          </div>);
}
