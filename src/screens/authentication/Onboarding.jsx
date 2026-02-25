import { useState, useRef, useEffect } from "react";
import ButtonIcon from "../../components/buttons/buttonIcon/ButtonIcon";
import colors from "../../config/colors";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// css
import "./Onboarding.css";

// images
import onboarding_image_1 from "../../assets/elements/onboarding1.svg";
import onboarding_image_2 from "../../assets/elements/onboarding2.svg";
import onboarding_image_3 from "../../assets/elements/onboarding1.svg";
import onboarding_image_4 from "../../assets/elements/get_started.svg";
import { ROUTE_SIGN_UP } from "../../config/constants";

// Slides data
const slides = [
  {
    id: "0",
    image: onboarding_image_1,
    title: "Buy & Sell on Campus",
    subtitle:
      "Find fairly used items from fellow student,\nor sell what you no longer need,\nall within your school community.",
  },
  {
    id: "1",
    image: onboarding_image_2,
    title: "Verified Users",
    subtitle:
      "Every item comes from verified students,\nso you get honest prices, safe  transactions,\nand zero guesswork.",
  },
  {
    id: "2",
    image: onboarding_image_3,
    title: "List. Shop. Done.",
    subtitle:
      "Upload items in minutes, chat with buyers,\nand get what you need, quickly\nand hassle-free.",
  },
  {
    id: "3",
    image: onboarding_image_4,
    title: "Get Started",
    subtitle:
      "Join your campus marketplace\nand start buying or selling in minutes.",
  },
];

const Slide = ({ item }) => {
  return (
    <section className="image-container">
      <img src={item.image} alt={item.title} className="slider-image" />
      <div className="text-container">
        <div className="title">{item.title}</div>
        <div className="sub-title" style={{ whiteSpace: "pre-line" }}>
          {item.subtitle}
        </div>
      </div>
    </section>
  );
};

function Onboarding() {
  const containerRef = useRef(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setWidth(containerRef.current.clientWidth);
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const updateCurrentSlideIndex = (e) => {
    const currentOffsetX = e.target.scrollLeft;
    const currentIndex = Math.round(currentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  const goToNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex < slides.length) {
      const offset = nextSlideIndex * width;
      containerRef?.current?.scrollTo({ left: offset, behavior: "smooth" });
    }
  };

  const skip = () => {
    const lastSlideIndex = slides.length - 1;
    const offset = lastSlideIndex * width;
    containerRef?.current?.scrollTo({ left: offset, behavior: "smooth" });
  };

  const goToPreviousSlide = () => {
    const previousSlide = currentSlideIndex - 1;
    if (previousSlide >= 0) {
      const offset = previousSlide * width;
      containerRef?.current?.scrollTo({ left: offset, behavior: "smooth" });
    }
  };

  const FooterSection = () => {
    return (
      <div className="slider-footer">
        <div className="indicator-container">
          {slides.map((_, index) => (
            <div
              key={index}
              className="indicator"
              style={{
                ...(currentSlideIndex === index
                  ? { backgroundColor: colors.primary, width: 16 }
                  : { backgroundColor: colors.gray, width: 16 }),
              }}
            ></div>
          ))}
        </div>
        <div className="button-container">
          {currentSlideIndex === slides.length - 1 ? (
            <div className="footer-buttons flex-end">
              <a
                href={ROUTE_SIGN_UP}
                style={{
                  height: 40,
                  width: 130,
                  borderRadius: 35,
                  fontSize: 16,
                  backgroundColor: colors.primary,
                  color: colors.white,
                  borderColor: colors.primary,
                  textDecoration: "none",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Get Started
              </a>
            </div>
          ) : (
            <div className="footer-buttons">
              {currentSlideIndex > 0 && (
                <ButtonIcon
                  icon={<FaChevronLeft />}
                  borderColor={colors.primary}
                  height={40}
                  width={40}
                  backgroundColor={colors.primary}
                  borderRadius={35}
                  color={colors.white}
                  onClick={goToPreviousSlide}
                />
              )}
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <ButtonIcon
                  icon={<FaChevronRight />}
                  borderColor={colors.primary}
                  height={40}
                  width={40}
                  backgroundColor={colors.primary}
                  borderRadius={35}
                  color={colors.white}
                  onClick={goToNextSlide}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="onboarding-wrapper">
      <div className="top-bar">
        {currentSlideIndex < slides.length - 1 && (
          <div
            style={{
              marginLeft: "auto",
              color: colors.primary,
              fontSize: 18,
              cursor: "pointer",
            }}
            onClick={skip}
          >
            <ButtonIcon
              buttonText="Skip"
              height={40}
              width={40}
              borderRadius={35}
              color={colors.primary}
              borderColor={colors.white}
              onClick={skip}
            />
          </div>
        )}
      </div>
      <div
        ref={containerRef}
        className="slider-container"
        onScroll={updateCurrentSlideIndex}
      >
        <div className="slider-inner">
          {slides.map((item) => (
            <div key={item.id} className="slide-wrapper">
              <Slide item={item} />
            </div>
          ))}
        </div>
      </div>
      <FooterSection />
    </div>
  );
}

export default Onboarding;
