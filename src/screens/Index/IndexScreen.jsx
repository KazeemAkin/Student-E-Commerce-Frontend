/* eslint-disable react-hooks/exhaustive-deps */
import Navbar from "../../components/navbar/Navbar";
import HomeHeader from "./HomeHeader";

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

function IndexScreen() {
  useUserGuard(false);
  const [books, setBooks] = useState([]);
  const [furniture, setFurniture] = useState([]);
  const [kitchenware, setKitchenware] = useState([]);
  const [sport_wear, setSportWear] = useState([]);
  const [dinner_wares, setDinnerWares] = useState([]);
  const [miscellaneous, setMiscellaneous] = useState([]);
  const [tech_wares, setTechWares] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const toastTR = useRef(null);

  useEffect(() => {
    getProducts();
    getProducts('books');
    getProducts('furniture');
    getProducts('tech_wares');
    getProducts('kitchenware');
    getProducts('sport_wear');
    getProducts('sport_wear');
    getProducts('dinner_wares');
    getProducts('miscellaneous');
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

      if (category === 'books') {
        return setBooks(isArray(response_data?.response?.products) ? response_data.response.products : []);
      } else if (category === 'furniture') {
        return setFurniture(isArray(response_data?.response?.products) ? response_data.response.products : []);
      } else if (category === 'tech_wares') {
        return setTechWares(isArray(response_data?.response?.products) ? response_data.response.products : []);
      } else if (category === 'kitchenware') {
        return setKitchenware(isArray(response_data?.response?.products) ? response_data.response.products : []);
      } else if (category === 'sport_wear') {
        return setSportWear(isArray(response_data?.response?.products) ? response_data.response.products : []);
      } else if (category === 'dinner_wares') {
        return setDinnerWares(isArray(response_data?.response?.products) ? response_data.response.products : []);
      } else if (category === 'miscellaneous') {
        return setMiscellaneous(isArray(response_data?.response?.products) ? response_data.response.products : []);
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
      <BottomNavbar />

      <HomeHeader />

      <div className="home-container">
        {/* products */}
        <Listings data={products} />

        {/* books */}
        <Listings data={books} title="Books" />

        {/* Furniture */}
        <Listings data={furniture} title="Furniture" />

        {/* Tech-wares */}
        <Listings data={tech_wares} title="Tech-wares" />

        {/* Dinnerware */}
        <Listings data={dinner_wares} title="Dinner Ware" />

        {/* Sports-wares */}
        <Listings data={sport_wear} title="Sport Wear" />

        {/* Kitchenware */}
        <Listings data={kitchenware} title="Kitchenware" />

        {/* Misc */}
        <Listings data={miscellaneous} title="Miscellaneous" />
      </div>

      <Footer />
    </section>
  );
}

export default IndexScreen;
