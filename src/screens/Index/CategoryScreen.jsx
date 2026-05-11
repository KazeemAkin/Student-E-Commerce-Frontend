/* eslint-disable react-hooks/exhaustive-deps */
import Navbar from "../../components/navbar/Navbar";

// api
import productApi from '../../api/Products';

// css
import "../Index/Index.css";
import Footer from "../../components/footer/Footer";
import BottomNavbar from "../../components/navbar/BottomNavbar";
import Listings from "./Listings";
import { useUserGuard } from "../../hooks/UserGuard";
import { useEffect, useRef, useState } from "react";
import { empty, isArray, prepareResponseData } from "../../Utilities/utils";
import { useParams } from "react-router-dom";

function CategoryScreen() {
  useUserGuard(false);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const toastTR = useRef(null);
  const { category_slug, category } = useParams() || {};

  useEffect(() => {
    if (!empty(category_slug)) {
      getProducts(category_slug);
    }
  }, [])

  // alert functions
  const responseDialog = (severity = null, summary = null, detail = null) => {
    toastTR?.current?.show({
      severity,
      summary,
      detail,
      life: 8000,
    });
  };


  const getProducts = async (category = null) => {
    try {
      if (!isLoading) setIsLoading(true);

      const response = await productApi.getProducts({ limit: 10, category  });
      const response_data = prepareResponseData(response);
      if (!response_data.success) {
        return responseDialog(
          "error",
          "Error Alert",
          !empty(response_data) && !empty(response_data.response)
            ? response_data.response
            : "Failed to fetch products!",
        );
      }
      
      return setProducts(isArray(response_data?.response?.products) ? response_data.response.products : []);
    } catch (error) {
      responseDialog("error", "Error Alert", "Something went wrong while fetching products.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="main-wrapper">
      <Navbar active_screen="home" />
      <BottomNavbar active_tab={category_slug} />

      <div className="home-container">
        {/* products */}
        <Listings data={products} title={category} is_category_page={true}  />
      </div>

      <Footer />
    </section>
  );
}

export default CategoryScreen;
