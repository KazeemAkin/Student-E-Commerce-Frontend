import "./SectionHeader.css";

const SectionHeader = ({ title, subtitle, link }) => {
  return (
    <div className="list_item">
      <div>
        <span className="list_item_title">{title}</span>
        <span className="list_item_subtitle">{subtitle}</span>
      </div>
    </div>
  );
};

export default SectionHeader;
