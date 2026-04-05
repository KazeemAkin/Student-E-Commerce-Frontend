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
import ButtonIcon from "../../components/buttons/buttonIcon/ButtonIcon";
import { NavLink } from "react-router-dom";
import { ROUTE_CHAT } from "../../config/constants";

function ProfileHeader() {
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
              <span>John Doe</span>
              <span className="username">(JD)</span>
            </div>
            <span className="bio">I am a free shopper</span>
            <div className="email">
              <FaEnvelope color={colors.primary} />
              <span>john.doe@example.com</span>
            </div>
            <div className="phone_number">
              <FaPhoneAlt color={colors.primary} />
              <span>+44 5849 4894</span>
            </div>
          </div>
          <div className="edit-pen">
            <div className="pen-box">
              <FaPen color={colors.black} size={12} />
            </div>
          </div>
        </div>
      </div>

      {/* bottom header details */}
      <div className="header-bottom-details">
        <div className="product-buttons">
          <ButtonIcon
            buttonText="Add Product"
            color={colors.white}
            backgroundColor={colors.green}
            borderColor={colors.green}
            width={130}
            height={26}
            icon={<FaPlus size={12} />}
            textMarginLeft={12}
            fontSize={12}
          />
          <ButtonIcon
            buttonText="List Products"
            color={colors.white}
            backgroundColor={colors.primary}
            borderColor={colors.primary}
            width={130}
            height={26}
            icon={<FaListAlt size={12} />}
            textMarginLeft={12}
            fontSize={12}
          />
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;
