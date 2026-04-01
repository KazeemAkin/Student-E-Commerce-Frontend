import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";

function SimpleLabels() {
  return (
    <div
      className="text-danger simple-label"
      style={{
        marginTop: 10,
      }}
    >
      <FaExclamationTriangle /> Already assigned a parent
    </div>
  );
}

export default SimpleLabels;
