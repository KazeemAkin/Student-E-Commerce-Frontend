import React from "react";
import { FaUserGraduate } from "react-icons/fa";
import { empty } from "../../../Utilities/utils";

// css
import "./ItemCard.css";

// config
import colors from "../../../config/colors";

// components
import FloatingButton from "../../buttons/floatingButton/FloatingButton";

function ItemCard({
  width = "20%",
  height = 350,
  img,
  fullName = "---",
  regNo = "---",
  classTitle = "---",
  floatingButtonActive = false,
  floatingButtonAction,
}) {
  return (
    <div className="item-card" style={{ width, height }}>
      <div className="image-container mb-10">
        {!empty(img) ? (
          <img src={img} alt="" />
        ) : (
          <FaUserGraduate size={150} color={colors.primary} />
        )}
      </div>
      <div className="details mb-10">
        <span className="fs-16 bold text-primary">{fullName}</span>
        <span className="mute-text fs-14 bold">{regNo}</span>
        <span className="mute-text fs-14 ">{classTitle}</span>
      </div>
      <FloatingButton
        active={floatingButtonActive}
        onPressedAction={floatingButtonAction}
      />
    </div>
  );
}

export default ItemCard;
