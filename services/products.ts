import axios from 'axios';

const TIMEOUT = 10000; // 10 seconds

export const searchProducts = async (query: string, page = 0) => {
  const perPage = 20;
  console.log('calling searchProducts...');
  const params: any = {
    publisherId: 'TEST',
    locale: 'en_US',
    start: page * perPage,
    perPage,
  };
  if (query.trim().length > 0) {
    params.term = query;
  }

  try {
    const response = await axios.get(
      `${process.env.EXPO_PUBLIC_SHOP_BASE_URL}/products`,
      {
        params,
        headers: {
          API_KEY: process.env.EXPO_PUBLIC_SHOP_API_KEY,
        },
        timeout: TIMEOUT,
      },
    );
    console.info('done calling searchProducts...');
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const getProductDetails = async (productId: number) => {
  try {
    const response = await axios.get(
      `${process.env.EXPO_PUBLIC_SHOP_BASE_URL}/products/${productId}`,
      {
        params: {
          publisherId: 'TEST',
          locale: 'en_US',
          productId: String(productId),
        },
        headers: {
          API_KEY: process.env.EXPO_PUBLIC_SHOP_API_KEY,
        },
        timeout: TIMEOUT, // Add timeout here
      },
    );
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

function handleApiError(error: any) {
  let errorMessage = 'Something went wrong. Please try again later.';
  const status: number = error.response?.status;
  if (status) {
    if (status === 400) {
      errorMessage = 'Invalid request. Please check your input.';
    } else if (status === 401) {
      errorMessage = 'Unauthorized.';
    } else if (status === 500) {
      errorMessage = 'Server error. Please try again later.';
    } else {
      errorMessage = 'Error Code: ' + status.toString();
    }
  } else if (error.message) {
    errorMessage = error.message;
  }

  return { error: errorMessage };
}
