import { ROUTE_CATEGORY } from "../../config/constants";
import colors from "../../config/colors";

function BottomNavbar({ active_tab }) {
  return (
    <section className="bottom-nav">
      <ul>
        <li>
          <a
            href={ROUTE_CATEGORY + `/books/Books`}
            style={{ textDecoration: "none", color: colors.white }}
          >
            <span style={{ color: active_tab === 'books' ? colors.primary : colors.white, textDecoration: active_tab === 'books' ? 'underline' : 'none' }}>Books</span>
          </a>
        </li>
        <li>
          <a
            href={ROUTE_CATEGORY + `/furniture/Furniture`}
            style={{ textDecoration: "none", color: colors.white }}
          >
            <span style={{ color: active_tab === 'furniture' ? colors.primary : colors.white, textDecoration: active_tab === 'furniture' ? 'underline' : 'none' }}>Furniture</span>
          </a>
        </li>
        <li>
          <a
            href={ROUTE_CATEGORY + `/tech_wares/Tech-ware`}
            style={{ textDecoration: "none", color: colors.white }}
          >
            <span style={{ color: active_tab === 'tech_wares' ? colors.primary : colors.white, textDecoration: active_tab === 'tech_wares' ? 'underline' : 'none' }}>Tech-wares</span>
          </a>
        </li>
        <li>
          <a
            href={ROUTE_CATEGORY + `/kitchenware/Kitchenware`}
            style={{ textDecoration: "none", color: colors.white }}
          >
            <span style={{ color: active_tab === 'kitchenware' ? colors.primary : colors.white, textDecoration: active_tab === 'kitchenware' ? 'underline' : 'none' }}>Kitchenware</span>
          </a>
        </li>
        <li>
          <a
            href={ROUTE_CATEGORY + `/sport_wear/Sports Wear`}
            style={{ textDecoration: "none", color: colors.white }}
          >
            <span style={{ color: active_tab === 'sport_wear' ? colors.primary : colors.white, textDecoration: active_tab === 'sport_wear' ? 'underline' : 'none' }}>Sportswear</span>
          </a>
        </li>
        <li>
          <a
            href={ROUTE_CATEGORY + `/dinner_wares/Dinnerware`}
            style={{ textDecoration: "none", color: colors.white }}
          >
            <span style={{ color: active_tab === 'dinner_wares' ? colors.primary : colors.white, textDecoration: active_tab === 'dinner_wares' ? 'underline' : 'none' }}>Dinnerware</span>
          </a>
        </li>
        <li>
          <a
            href={ROUTE_CATEGORY + `/miscellaneous/Miscellaneous`}
            style={{ textDecoration: "none", color: colors.white }}
          >
            <span style={{ color: active_tab === 'miscellaneous' ? colors.primary : colors.white, textDecoration: active_tab === 'miscellaneous' ? 'underline' : 'none' }}>Miscellaneous</span>
          </a>
        </li>
      </ul>
    </section>
  );
}

export default BottomNavbar;
