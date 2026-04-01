import ButtonIcon from "../../components/buttons/buttonIcon/ButtonIcon";

// images
import headerImage from "../../assets/home-header-image.png";
import colors from "../../config/colors";

function HomeHeader() {
  return (
    <section className="home-header-wrapper">
      <div className="text-area">
        <h1>
          Student
          <br />
          Pocket-Friendly
          <br />
          E-commerce
        </h1>
        <h6>
          Sell what you no longer need, buy what you need at an affordable
          price.
        </h6>
        <div className="learn-more">
          <ButtonIcon
            borderRadius={0}
            backgroundColor={colors.primary}
            buttonText="Learn More"
            borderColor={colors.primary}
            width={195}
            height={51}
            color={colors.white}
            fontSize={16}
          />
        </div>
      </div>
      <div className="image-box">
        <img src={headerImage} alt="" />
      </div>
    </section>
  );
}

export default HomeHeader;
