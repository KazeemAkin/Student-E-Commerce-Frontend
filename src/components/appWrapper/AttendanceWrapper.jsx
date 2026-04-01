import React, { useContext, useEffect, useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import Navbar from "../navbar/Navbar";
import { useNavigate } from "react-router-dom";

// css
import "./AppWrapper.css";

// api
import { AuthContext } from "../../screens/Root/ProtectedRoute";
import AttendanceSidebar from "../sidebar/AttendanceSidebar";

function AttendanceWrapper({ children, sidebarOpen, toggleSidebar }) {
  const { sessionActive, termActive, sessionEmpty } = useContext(AuthContext);
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [redirectUrl, setRedirectUrl] = useState("");

  useEffect(() => {
    const currentPath = window.location.pathname;
    const isSessionPage = currentPath.includes("session");
    const isTermPage = currentPath.includes("term");

    if (termActive && sessionActive && !sessionEmpty) {
      setVisible(false);
    } else {
      if (!(isSessionPage || isTermPage)) {
        if (sessionEmpty) {
          setVisible(true);
          setResponseMessage(
            "You do not have any registered session. Please click the button below to register a session."
          );
          setRedirectUrl("/session/add");
        } else if (!sessionActive) {
          setVisible(true);
          setResponseMessage(
            "There is no active session. Please click the button below to activate session."
          );
          setRedirectUrl("/sessions");
        } else if (!termActive) {
          setResponseMessage(
            "There is no active term. Please click the button below to set an active term."
          );
          setRedirectUrl("/terms");
        }
      } else {
        setVisible(false);
      }
    }
  }, [termActive, sessionActive, sessionEmpty]);

  const footerContent = (
    <div>
      <Button
        label="Continue to Setup"
        icon="pi pi-check"
        style={{ backgroundColor: "#633ccd", borderColor: "#633ccd" }}
        onClick={() => {
          setVisible(false);
          navigate(redirectUrl);
        }}
        autoFocus
      />
    </div>
  );

  return (
    <>
      <Navbar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      {children}
      <AttendanceSidebar
        sidebarOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
      />
      <Dialog
        header="Setup Incomplete"
        visible={visible}
        onHide={() => setVisible(false)}
        style={{ width: "50vw" }}
        footer={footerContent}
        className="overlay-info"
      >
        <p>
          <strong>You are almost there...</strong>
        </p>
        <p className="mt-10">{responseMessage}</p>
      </Dialog>
    </>
  );
}

export default AttendanceWrapper;
