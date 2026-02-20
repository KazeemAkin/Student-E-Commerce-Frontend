import React from "react";

function AssessmentTableHeader({
  title1,
  title2,
  title3,
  title4,
  title5,
  title6,
  title7,
  title8,
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        marginTop: 10,
        borderBottom: "1px solid #633ccd57",
        paddingBottom: 10,
      }}
    >
      <div
        style={{
          marginRight: 20,
          width: "50%",
        }}
      >
        <strong>{title1}</strong>
      </div>
      <div
        style={{
          marginRight: 20,
          width: "5%",
        }}
      >
        <strong>{title2}</strong>
      </div>
      <div style={{ marginRight: 20, width: "5%" }}>
        <strong>{title3}</strong>
      </div>
      <div style={{ marginRight: 20, width: "5%" }}>
        <strong>{title4}</strong>
      </div>
      <div style={{ marginRight: 20, width: "5%" }}>
        <strong>{title5}</strong>
      </div>
      <div style={{ marginRight: 20, width: "5%" }}>
        <strong>{title6}</strong>
      </div>
      <div style={{ marginRight: 20, width: "15%" }}>
        <strong>{title7}</strong>
      </div>
      <div style={{ marginRight: 20, width: "10%" }}>
        <strong>{title8}</strong>
      </div>
    </div>
  );
}

export default AssessmentTableHeader;
