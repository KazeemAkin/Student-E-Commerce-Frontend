// image
import imageHeader from "../../assets/profile-header-image.png";
import defaultAvatar from "../../assets/avatars/avatar.png";
import {
  FaCartPlus,
  FaEnvelope,
  FaGraduationCap,
  FaListAlt,
  FaPen,
  FaPhoneAlt,
  FaPlus,
  FaShoppingBag,
} from "react-icons/fa";
import { MdChat, MdMenu } from "react-icons/md";
import colors from "../../config/colors";
import { NavLink, useParams } from "react-router-dom";
import {
  ROUTE_CHAT,
  ROUTE_PRODUCT_ADD,
  ROUTE_PRODUCTS,
} from "../../config/constants";
import { useContext } from "react";
import { AuthContext } from "../Root/ProtectedRoute";
import { empty, isArray, isObject } from "../../Utilities/utils";

function ProfileHeader() {
  const { user_id } = useParams();
  const { user } = useContext(AuthContext);

  return (
    <div className="profile-header">
      <div className="header-image-box">
        <img src={imageHeader} alt="" />

        <div className="profile-data">
          <div className="avatar-box">
            <div className="avatar-container">
              <img src={defaultAvatar} alt="profile avatar" />
            </div>
          </div>
          <div className="bio-data">
            <div className="name">
              <span>
                {user?.first_name || ""} {user?.last_name || ""}
              </span>
              <span className="username">(JD)</span>
            </div>
            <span className="bio">{user?.bio || ""}</span>
            <div className="email">
              <FaEnvelope color={colors.primary} />
              <span>{user?.email || ""}</span>
            </div>
            <div className="phone_number">
              <FaPhoneAlt color={colors.primary} />
              <span>{user?.phone_number || ""}</span>
            </div>
          </div>
          {isObject(user) &&
            isArray(user?.user_type) &&
            user?.user_type.includes("Seller") &&
            !user_id && (
              <div className="edit-pen">
                <div className="pen-box">
                  <FaPen color={colors.black} size={12} />
                </div>
              </div>
            )}
        </div>
      </div>

      {/* bottom header details */}
      <div className="header-bottom-details">
        <div className="product-buttons">
          {isObject(user) &&
            isArray(user?.user_type) &&
            user?.user_type.includes("Seller") &&
            !user_id && (
              <>
                <NavLink
                  to={ROUTE_PRODUCT_ADD}
                  style={{ textDecoration: "none" }}
                >
                  <div className="button bg-green text-white">
                    <FaPlus size={12} />
                    <span>Add Product</span>
                  </div>
                </NavLink>
                <NavLink to={ROUTE_PRODUCTS} style={{ textDecoration: "none" }}>
                  <div className="button bg-primary text-white">
                    <FaListAlt size={12} />
                    <span>List Products</span>
                  </div>
                </NavLink>
              </>
            )}
        </div>

        <div className="other-details">
          <div className="left-contents">
            <div className="college">
              <FaGraduationCap color={colors.primary} size={16} />
              <span>College of Finance</span>
            </div>
            <div className="purchase-stats">
              <div className="item-bought">
                <FaCartPlus color={colors.primary} size={16} />
                <span>5 Items Bought</span>
              </div>
              <div className="item-sold">
                <FaShoppingBag color={colors.primary} size={16} />
                <span>5 Items Sold</span>
              </div>
            </div>
            <div className="action-buttons">
              {!empty(user) && (
                <>
                  <NavLink
                    to={ROUTE_CHAT}
                    style={{ textDecoration: "none", color: colors.primary }}
                  >
                    <MdChat size={22} />
                  </NavLink>
                  <NavLink
                    onClick={(e) => e.preventDefault()}
                    style={{ textDecoration: "none", color: colors.primary }}
                  >
                    <MdMenu size={22} />
                  </NavLink>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;
