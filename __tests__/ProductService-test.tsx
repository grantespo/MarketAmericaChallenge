import axios from 'axios';

import { mockProduct, mockProductSearch } from '../__mocks__/MockProduct';
import { searchProducts, getProductDetails } from '../services/products';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Product Services', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('searchProducts', () => {
    it('successfully fetches products without query', async () => {
      mockedAxios.get.mockResolvedValue({ data: mockProductSearch });

      const result = await searchProducts('', 0);

      expect(result).toEqual(mockProductSearch);
    });

    it('fetches products with a search query', async () => {
      mockedAxios.get.mockResolvedValue({ data: mockProductSearch });

      const result = await searchProducts('shoes', 1);

      expect(result).toEqual(mockProductSearch);
    });

    it('handles API errors explicitly in searchProducts', async () => {
      mockedAxios.get.mockRejectedValue({ response: { status: 500 } });

      const result = await searchProducts('shoes');

      expect(result).toEqual({
        error: 'Server error. Please try again later.',
      });
    });

    // ✅ Tests for getProductDetails explicitly
    it('fetches product details successfully', async () => {
      mockedAxios.get.mockResolvedValue({ data: mockProduct });

      const result = await getProductDetails(123);

      expect(result).toEqual(mockProduct);
    });

    it('handles bad request error in getProductDetails explicitly', async () => {
      mockedAxios.get.mockRejectedValue({ response: { status: 400 } });

      const result = await getProductDetails(123);

      expect(result).toEqual({
        error: 'Invalid request. Please check your input.',
      });
    });

    it('handles unauthorized error in getProductDetails explicitly', async () => {
      mockedAxios.get.mockRejectedValue({ response: { status: 401 } });

      const result = await getProductDetails(123);

      expect(result).toEqual({ error: 'Unauthorized.' });
    });

    it('handles other status error in getProductDetails explicitly', async () => {
      mockedAxios.get.mockRejectedValue({ response: { status: 542 } });

      const result = await getProductDetails(123);

      expect(result).toEqual({ error: 'Error Code: 542' });
    });

    it('handles error message without status code in getProductDetails explicitly', async () => {
      mockedAxios.get.mockRejectedValue({ message: 'Known Error' });

      const result = await getProductDetails(123);

      expect(result).toEqual({ error: 'Known Error' });
    });

    it('handles error message without status code or message in getProductDetails explicitly', async () => {
      mockedAxios.get.mockRejectedValue({ response: { invalidResponse: {} } });

      const result = await getProductDetails(123);

      expect(result).toEqual({
        error: 'Something went wrong. Please try again later.',
      });
    });
  });
});
