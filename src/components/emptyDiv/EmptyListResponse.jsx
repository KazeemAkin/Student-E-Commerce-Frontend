import React from "react";
import noDataImage from "../../assets/customTags/no-data.png";

export default function EmptyListResponse({ message = "Sorry! Nothing to see here!" }) {
  return (
    <div className="flex justify-center align-center direction-column mt-30">
      <img src={noDataImage} style={{ width: 150 }} alt="" />
      <p>{message}</p>
    </div>
  );
}
