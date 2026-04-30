import "./SectionHeader.css";

const SectionHeader = ({ title, subtitle, fontWeight = "500" }) => {
  return (
    <div className="list_item">
      <div>
        <span className="list_item_title" style={{ fontWeight }}>
          {title}
        </span>
        <span className="list_item_subtitle">{subtitle}</span>
      </div>
    </div>
  );
};

export default SectionHeader;
