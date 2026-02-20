import "./MainHeader.css";
import ButtonIcon from "../../buttons/buttonIcon/ButtonIcon";
import { NavLink } from "react-router-dom";

const MainHeader = ({
  icon,
  rightIcon,
  leftIcon,
  title,
  button,
  buttonText,
  link,
  children,
  redirect = true,
  onClick,
  showButton = true,
  titleColor = "#000000",
  multiButtons,
  buttonHeight = 30,
  ...others
}) => {
  return (
    <div className="main_header">
      <div className="left_header_title">
        {leftIcon && <span className="main_header_icon">{leftIcon}</span>}
        <span className="main_header_text">
          <span style={{ color: titleColor, fontSize: 16 }}>{title}</span>{" "}
          {rightIcon && <div>{rightIcon}</div>}
        </span>
      </div>
      {button && (
        <div className="header_button">
          {!redirect && showButton ? (
            <ButtonIcon
              backgroundColor="#633ccd"
              color="#ffffff"
              icon={icon}
              buttonText={buttonText}
              onClick={onClick}
              height={buttonHeight}
              {...others}
            />
          ) : (
            <>
                { !multiButtons ?
                    <NavLink to={link} style={{ textDecoration: "none" }}>
                      <ButtonIcon
                        backgroundColor="#633ccd"
                        color="#ffffff"
                        icon={icon}
                        height={buttonHeight}
                        buttonText={buttonText}
                        {...others}
                      />
                    </NavLink> :
                  multiButtons
                }
            </>
          )}
        </div>
      )}
      {children && <div className="header_button">{children}</div>}
    </div>
  );
};

export default MainHeader;
