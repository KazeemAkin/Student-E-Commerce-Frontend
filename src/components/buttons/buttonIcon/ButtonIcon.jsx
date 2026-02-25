import "./ButtonIcon.css";
import Button from "@mui/material/Button";
import { FaListUl } from "react-icons/fa";
import { isString } from "../../../Utilities/utils";

function ButtonIcon({
  backgroundColor,
  borderColor,
  color,
  icon,
  marginTop,
  buttonText,
  width,
  height,
  onClick,
  type,
  className,
  marginRight,
  fontSize = 14,
  textMarginLeft,
  iconMarginLeft,
  borderHover = true,
  marginBottom = 0,
  borderRadius = 24,
  fontWeight = "normal",
  iconMarginRight = 0,
  marginLeft = 0,
  iconRight,
  minWidth = 0,
  padding = 0,
}) {
  return (
    <Button
      type={type}
      sx={{
        backgroundColor,
        color,
        width,
        borderColor,
        marginTop,
        height,
        marginRight,
        marginLeft,
        borderRadius,
        marginBottom,
        textMarginLeft,
        textTransform: "none",
        minWidth,
        padding,
        "&:hover": {
          backgroundColor,
          opacity: 0.8,
          ...(borderHover && { borderColor: "transparent" }),
        },
      }}
      variant="outlined"
      onClick={onClick}
      className={className}
    >
      {buttonText === "View all" ? (
        <FaListUl style={{ fontSize }} />
      ) : (
        icon && (
          <span style={{ marginRight: iconMarginRight, marginTop: 3 }}>
            {icon}
          </span>
        )
      )}
      <span style={{ marginLeft: textMarginLeft, fontWeight, fontSize }}>
        {buttonText && isString(buttonText)
          ? buttonText.charAt(0).toUpperCase() + buttonText.slice(1)
          : buttonText}
      </span>
      {iconRight && (
        <span style={{ marginLeft: iconMarginLeft, marginTop: 3 }}>
          {iconRight}
        </span>
      )}
    </Button>
  );
}

export default ButtonIcon;
