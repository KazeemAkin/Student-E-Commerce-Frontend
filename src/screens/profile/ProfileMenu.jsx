import { useState } from 'react';
import { 
  User, Wallet, History, ShoppingBag, Heart, Star, Lock, ChevronDown 
} from 'lucide-react';
import { ROUTE_PURCHASE_HISTORY } from '../../config/constants';
import { useNavigate } from 'react-router-dom';
import { empty, isArray } from '../../Utilities/utils';
// import { FaUser } from 'react-icons/fa';

const menuData = [
  {
    id: 'profile',
    title: 'Profile Details',
    icon: <User className="w-5 h-5" />,
    items: ['Profile Display', 'Update Profile Display'],
    defaultOpen: true,
    link: '#'
  },
  {
    id: 'wallet',
    title: 'Wallet',
    icon: <Wallet className="w-5 h-5" />,
    items: [],
    link: '#'
  },
  {
    id: 'purchase-history',
    title: 'Purchase History',
    icon: <History className="w-5 h-5" />,
    items: [],
    link: ROUTE_PURCHASE_HISTORY
  },
  {
    id: 'sells-history',
    title: 'Sells History',
    icon: <ShoppingBag className="w-5 h-5" />,
    items: [],
    link: '#'
  },
  {
    id: 'favourite-sellers',
    title: 'Favourite Sellers',
    icon: <Heart className="w-5 h-5" />,
    items: [],
    link: '#'
  },
  {
    id: 'favourite-items',
    title: 'Favourite Items',
    icon: <Star className="w-5 h-5" />,
    items: [],
    link: '#'
  },
  {
    id: 'interest-lists',
    title: 'Interest Lists',
    icon: <Star className="w-5 h-5" />,
    items: [],
    link: '#'
  },
  {
    id: 'security',
    title: 'Security Settings',
    icon: <Lock className="w-5 h-5" />,
    items: ['Change Password', 'PIN Settings', 'Delete Account'],
    defaultOpen: false,
    link: '#'
  },
];

export default function ProfileMenu() {
  const [openSections, setOpenSections] = useState(() => {
    const initial = {};
    menuData.forEach(section => {
      initial[section.id] = section.defaultOpen ?? false;
    });
    return initial;
  });
  const navigate = useNavigate();

  const toggleSection = (id) => {
    setOpenSections(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleMenuClick = (link) => {
    if (link && link !== '#') {
      navigate(link);
    }
  };

  return (
    <div className="profile-menu-items">
      {isArray(menuData) && menuData.map((section) => (
        <div key={section.id} className="menu-list-item">
          {/* Header */}
          <div onClick={() => handleMenuClick(section?.link)}
            className="menu-list-wrapper"
          >
            <div className="tab-title">
              <div className="icon">{section.icon}</div>
              <span className="title">{section.title}</span>
            </div>
            
            { (section.id === 'profile' || section.id === "security") && <ChevronDown
              className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                openSections[section.id] ? 'rotate-180' : ''
              }`}
            />}
          </div>

          {/* Content */}
          <div
            className={`sub-menu overflow-hidden transition-all duration-200 ${
              openSections[section.id] ? 'max-h-96' : 'max-h-0'
            }`}
          >
            <div className="px-6 pb-4 space-y-1">
              {!empty(section.items) && isArray(section.items) && section.items.map((item, index) => (
                <div
                  key={index}
                  className="sub-section"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}