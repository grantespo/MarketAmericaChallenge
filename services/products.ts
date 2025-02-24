import axios from "axios";
const BASE_URL = "https://api2.shop.com/AffiliatePublisherNetwork/v2";

export const searchProducts = async (query: string, page = 0) => {  
    var params = {
        publisherId: "TEST",
        locale: "en_US",
        term: query,
        start: page * 15, 
        perPage: 15
    }
    if (query.trim().length > 0) {
        params.term = query
    }
    try {
        console.log("calling searchProducts...")
      const response = await axios.get(`${BASE_URL}/products`, {
        params,
        headers: {
          API_KEY: process.env.EXPO_PUBLIC_SHOP_API_KEY 
        }
      });
      console.info("done calling searchProducts...")
      return response.data;
    } catch (error) {
      console.error("Error fetching search results:", error);
      return { products: [] };
    }
  };
export const getProductDetails = async (productId: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/product/v1/details`, {
      params: { 
        publisherId: "TEST",
        locale: "en_US",
        productId
     },
      headers: {
        API_KEY: `${process.env.EXPO_PUBLIC_SHOP_API_KEY}` 
     }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching product details:", error);
    return null;
  }
};