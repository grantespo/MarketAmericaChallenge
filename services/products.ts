import axios from "axios";

export const searchProducts = async (query: string, page = 0) => {  
    var params: any = {
        publisherId: "TEST",
        locale: "en_US",
        start: page * 15, 
        perPage: 15
    }
    if (query.trim().length > 0) {
        params.term = query
    }
    try {
        console.log("calling searchProducts...")
      const response = await axios.get(`${process.env.EXPO_PUBLIC_SHOP_BASE_URL}/products`, {
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
  
export const getProductDetails = async (productId: number) => {
  try {
    console.log("calling getProductDetails...")
    const response = await axios.get(`${process.env.EXPO_PUBLIC_SHOP_BASE_URL}/products/${productId}`, {
      params: { 
        publisherId: "TEST",
        locale: "en_US",
        productId: String(productId)
     },
      headers: {
        API_KEY: process.env.EXPO_PUBLIC_SHOP_API_KEY
     }
    });
    console.info("done calling getProductDetails...")
    return response.data;
  } catch (error) {
    console.error("Error fetching product details:", error);
    return null;
  }
};