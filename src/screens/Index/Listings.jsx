import SectionHeader from "../../components/header/sectionHeader/SectionHeader";

// image
import { ROUTE_CART, ROUTE_PRODUCT_DETAILS } from "../../config/constants";
import { NavLink } from "react-router-dom";
import colors from "../../config/colors";
import { FaShoppingCart } from "react-icons/fa";

// images
import avatar from "../../assets/avatars/avatar.png";
import borkenImage from "../../assets/demo-images/broken-image.png";
import product_image_1 from "../../assets/demo-images/book.png";
import product_image_2 from "../../assets/demo-images/cookingware.png";
import product_image_3 from "../../assets/demo-images/mattress.jpg";
import product_image_4 from "../../assets/demo-images/bag.png";
import { isArray } from "../../Utilities/utils";

const product_items = [
  {
    _id: 1,
    title: "Engineering textbook",
    image: product_image_1,
    avatar: avatar,
    cost: 2.3,
    sellerUsername: "John Doe",
  },
  {
    _id: 2,
    title: "Cooking utensils",
    image: product_image_2,
    avatar: avatar,
    cost: 5.99,
    sellerUsername: "Tinka",
  },
  {
    _id: 3,
    title: "Mattress",
    image: product_image_3,
    avatar: avatar,
    cost: 19.99,
    sellerUsername: "Jane Smith",
  },
  {
    _id: 4,
    title: "School Bag",
    image: product_image_4,
    avatar: avatar,
    cost: 12.5,
    sellerUsername: "Alice Johnson",
  },
];

function Listings({ title = "Listings", ...other }) {
  return (
    <section className="listings-wrapper">
      <SectionHeader title={title} {...other} />

      <div className="listings-container">
        {isArray(product_items) &&
          product_items.map((item, _id) => {
            return (
              <div className="listing-item" key={_id}>
                <NavLink
                  to={ROUTE_PRODUCT_DETAILS}
                  style={{ textDecoration: "none", color: colors.black }}
                >
                  <div className="header-image">
                    {item?.image ? (
                      <img src={item.image} alt="Product" />
                    ) : (
                      <img src={borkenImage} alt="broken" />
                    )}
                  </div>
                  <div className="title">{item?.title || "N/A"}</div>
                  <div className="price">
                    &pound;{item?.cost?.toFixed(2) || "0.00"}
                  </div>
                </NavLink>
                <div className="bottom-box">
                  <div className="avatar-box">
                    {item?.avatar ? (
                      <img src={item.avatar} alt="Avatar" />
                    ) : (
                      <img src={avatar} alt="Avatar" />
                    )}
                  </div>
                  <div className="name-box">
                    <span className="name">
                      {item?.sellerUsername || "N/A"}
                    </span>
                    <span className="cart">
                      <NavLink
                        to={ROUTE_CART}
                        style={{
                          textDecoration: "none",
                          color: colors.primary,
                        }}
                        className="cart-icon"
                      >
                        <FaShoppingCart color={colors.primary} />
                      </NavLink>
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </section>
  );
}

export default Listings;
