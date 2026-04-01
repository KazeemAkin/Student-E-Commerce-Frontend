function AppText({ children, size, color, fontFamily, style }) {
  return (
    <span
      style={{ fontSize: size, color: color || "black", fontFamily, ...style }}
    >
      {children}
    </span>
  );
}

export default AppText;
