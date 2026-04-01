import SectionHeader from "../../components/header/sectionHeader/SectionHeader";

function Listings({ title = "Listings" }) {
  return (
    <section className="listings-wrapper">
      <SectionHeader title={title} />
    </section>
  );
}

export default Listings;
