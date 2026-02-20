import React from "react";
import { FaTrash } from "react-icons/fa";

function AssessmentTable({
  title1,
  title2,
  title3,
  title4,
  title5,
  title6,
  title7,
  score,
  removeItem,
}) {
  let score_tag = "";
  if (score >= 70) {
    score_tag = "green";
  } else if (score >= 60 && score <= 69) {
    score_tag = "#633ccd";
  } else if (score >= 50 && score <= 59) {
    score_tag = "brown";
  } else if (score >= 45 && score <= 49) {
    score_tag = "gray";
  } else if (score >= 40 && score <= 44) {
    score_tag = "orange";
  } else {
    score_tag = "red";
  }

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
      <div style={{ marginRight: 20, width: "50%" }}>{title1}</div>
      <div
        style={{
          marginRight: 20,
          width: "5%",
        }}
      >
        {title2}
      </div>
      <div style={{ marginRight: 20, width: "5%" }}>{title3}</div>
      <div style={{ marginRight: 20, width: "5%" }}>{title4}</div>
      <div style={{ marginRight: 20, width: "5%", color: score_tag }}>
        {title5}
      </div>
      <div style={{ marginRight: 20, width: "5%", color: score_tag }}>
        {title6}
      </div>
      <div style={{ marginRight: 20, width: "15%" }}>{title7}</div>
      <div style={{ marginRight: 20, width: "10%" }}>
        <FaTrash
          onClick={removeItem}
          color="red"
          style={{ cursor: "pointer" }}
        />
      </div>
    </div>
  );
}

export default AssessmentTable;
