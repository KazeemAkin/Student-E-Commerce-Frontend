import SectionHeader from "../../components/header/sectionHeader/SectionHeader";
import colors from "../../config/colors";
import { isArray } from "../../Utilities/utils";
import { Rating } from "primereact/rating";

// css
import "./Ratings.css";

const ratings = [
  {
    id: 1,
    username: "Mike",
    message: "This is a nice product",
    rating: 4.3,
  },
  {
    id: 2,
    username: "Julia",
    message: "Nice item",
    rating: 3.5,
  },
  {
    id: 3,
    username: "Utin",
    message: "I only hoped and I was right. Nice product",
    rating: 4.5,
  },
  {
    id: 4,
    username: "Jango",
    message: "The product is as described.",
    rating: 5.0,
  },
];
function Ratings() {
  return (
    <section className="ratings-wrapper">
      <SectionHeader title="Ratings" />

      <div className="rating-container">
        {isArray(ratings) &&
          ratings.map((item) => {
            return (
              <div className="rating-item" key={item.id}>
                <div className="header">
                  <h3>{item?.username || "Anonymous"}</h3>
                  <div className="rating-value-box">
                    <span>
                      <Rating
                        value={item?.rating || 0}
                        readOnly
                        cancel={false}
                        style={{ color: colors.primary }}
                      />
                    </span>
                    <span className="rating-text">{item?.rating || 0}</span>
                  </div>
                </div>
                <div className="message">{item?.message || "---"}</div>
              </div>
            );
          })}
      </div>
    </section>
  );
}

export default Ratings;
