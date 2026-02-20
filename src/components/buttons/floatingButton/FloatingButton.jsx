import React, { useState } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";

// config
import colors from "../../../config/colors";

// components

function FloatingButton({ bottom = "12%", active = false, onPressedAction }) {
  const [isPressed, setIsPressed] = useState(false);
  const handleClick = () => {
    setIsPressed(true);

    onPressedAction();
    setTimeout(() => setIsPressed(false), 150);
  };

  return (
    <div
      className="floating-button-box"
      style={{
        width: 35,
        height: 35,
        borderRadius: 35,
        backgroundColor: !active ? colors.success : colors.danger,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        bottom,
        right: 15,
        cursor: "pointer",
        opacity: isPressed ? 0.6 : 1,
        transform: "0.2s",
      }}
      onClick={() => handleClick()}
    >
      {!active ? (
        <FaCheck color={colors.white} />
      ) : (
        <FaTimes color={colors.white} />
      )}
    </div>
  );
}

export default FloatingButton;
