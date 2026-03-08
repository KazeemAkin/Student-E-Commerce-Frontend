import colors from "../../config/colors";

function CustomCheckbox({ children, onClick }) {
  return (
    <div
      style={{
        border: `4px solid ${colors.primary}`,
        width: 25,
        height: 25,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

export default CustomCheckbox;
