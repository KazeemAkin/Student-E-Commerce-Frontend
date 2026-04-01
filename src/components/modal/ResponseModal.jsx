import React, { useState } from "react";
import {
  FaCheckCircle,
  FaExclamationTriangle,
  FaTimesCircle,
} from "react-icons/fa";

function ResponseModal({ modal_display = false, response_msg, isError }) {
  const [isModal, setIsModal] = useState(modal_display);
  return (
    <div
      className="error_modal"
      style={{
        display: isModal ? "block" : "none",
        position: "fixed",
        bottom: 20,
        left: 20,
        height: "auto",
        width: 350,
        background: "#ffffff",
        borderRadius: 7,
        overflow: "hidden",
        zIndex: 99999,
        padding: "10px 0",
        boxShadow: "0px 0px 4px 0px rgba(0,0,0,0.6)",
      }}
    >
      <div
        style={{
          width: "100%",
          height: 30,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          padding: "5px 15px",
          color: "#000000",
          fontSize: 16,
          fontWeight: "600",
          position: "relative",
        }}
      >
        <div
          style={{ position: "absolute", top: 0, right: 15, cursor: "pointer" }}
        >
          <FaTimesCircle onClick={() => setIsModal(false)} />
        </div>
        {isError ? (
          <>
            <FaExclamationTriangle
              color="#ce1616"
              style={{ marginRight: 25 }}
              size={18}
            />
            <span style={{ fontStyle: "italic", color: "#ce1616" }}>
              Error Alert
            </span>
          </>
        ) : (
          <>
            <FaCheckCircle
              color="#118f40"
              style={{ marginRight: 25 }}
              size={18}
            />
            <span style={{ fontStyle: "italic", color: "#118f40" }}>
              Success Alert
            </span>
          </>
        )}
      </div>
      <div style={{ minHeight: 30, padding: "8px 15px", fontSize: 14 }}>
        {response_msg}
      </div>
      <div
        style={{
          width: "100%",
          height: 20,
          display: "flex",
          justifyContent: "flex-end",
          padding: "8px 15px",
        }}
      ></div>
    </div>
  );
}

export default ResponseModal;
