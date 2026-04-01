import { useNavigate } from "react-router-dom";
import { ROUTE_HOME } from "../../config/constants";
import colors from "../../config/colors";

// css
import "./WelcomeScreen.css";

// components
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import ButtonIcon from "../../components/buttons/buttonIcon/ButtonIcon";

import welcomeImage from "../../assets/elements/welcome.svg";

function WelcomeScreen() {
  const navigate = useNavigate();

  return (
    <>
      <section className="welcome-page-wrapper">
        <Navbar active_screen="" include_search={false} />

        <div className="welcome-page-container">
          <div className="welcome-image-container">
            <img src={welcomeImage} alt="welcome" className="welcome-image" />
          </div>
          <div className="page-title-box">
            <div className="page-subtitle">
              Your account has been setup
              <br />
              successfully.
            </div>
          </div>
        </div>

        <div
          className="flex flex-end"
          style={{ width: "85%", paddingTop: 60, paddingBottom: 100 }}
        >
          <ButtonIcon
            buttonText="Continue"
            backgroundColor={colors.primary}
            borderColor={colors.primary}
            color={colors.white}
            width={198}
            height={51}
            marginTop={2}
            fontSize={16}
            borderRadius={0}
            onClick={() => {
              navigate(ROUTE_HOME);
            }}
          />
        </div>
      </section>
      {/* footer */}
      <Footer />
    </>
  );
}

export default WelcomeScreen;
