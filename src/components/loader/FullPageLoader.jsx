import { ProgressSpinner } from "primereact/progressspinner";
import React from "react";

export default function FullPageLoader({ visible = false }) {
  return (
    <div
      style={{
        position: "fixed",
        width: "100%",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.8)",
        zIndex: 1000000,
        display: visible ? "flex" : "none",
        justifyContent: "center",
        alignItems: "center",
        top: 0
      }}
    >
      <ProgressSpinner
        style={{ width: "70px", height: "70px" }}
        strokeWidth="8"
        animationDuration=".5s"
      />
    </div>
  );
}
