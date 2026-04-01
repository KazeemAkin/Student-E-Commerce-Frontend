import React from "react";

import "./ErrorPages.css";

function UnauthorizedPage() {
  return (
    <div className="not-found">
      <p className="not-found-title">Error 401</p>
      <p>Ooops! You are unauthorized to visit or access this resource.</p>
    </div>
  );
}

export default UnauthorizedPage;
