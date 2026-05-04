import React from 'react'
import { FaPen, FaTrash } from 'react-icons/fa'
import colors from '../../config/colors';

// image 
import broken_image from "../../assets/broken-image.png";
import { NavLink } from 'react-router-dom';
import { ROUTE_PRODUCT_EDIT } from '../../config/constants';

function UserProducts({ product_data, deleteProduct }) {

  return (
    <section className="user-product-listing-item" >
      <div className="left">
        <div className="image-container">
          {product_data?.product_image ? <img src={product_data.product_image} alt="product" /> : <img src={broken_image} alt='broken' />}
        </div>
        <div className="product-details">
          <span className="product-name">{ product_data?.name || 'N/A' }</span>
          <span className="product-cost">&pound;{ product_data?.price || 'N/A' }</span>
          <span className="product-visibility">{product_data?.status || 'N/A' }</span>
        </div>
      </div>

      <div className="right">
        <NavLink to={ROUTE_PRODUCT_EDIT + '/' + product_data?._id} >
          <div className="action-box"><FaPen color={colors.green} /></div>
        </NavLink>
        <div className="action-box" onClick={deleteProduct}><FaTrash color={colors.red} /></div>
      </div>
    </section>
  )
}

export default UserProducts