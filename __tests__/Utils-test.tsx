import { renderHook, act } from '@testing-library/react-native'
import { calculateDynamicImageHeight } from '../utils/calculateDynamicImageHeight';
import { decodeTrademarkSymbols } from '../utils/decodeTrademarkSymbols';
import { useDebounce } from '../utils/useDebounce';
import { Sku } from '../types/Sku';
import { mapProductOptionsToSkus } from '../utils/mapProductOptionstoSkus';
import { mockProduct } from '../__mocks__/MockProduct';
import { mockImage } from '../__mocks__/MockImage';

describe('calculateDynamicImageHeight', () => {
  test('calculates correct image height maintaining aspect ratio', () => {
    expect(calculateDynamicImageHeight(200, 100, 100)).toBe(50);
    expect(calculateDynamicImageHeight(1920, 1080, 960)).toBe(540);
  });

  test('returns 0 if original width is 0', () => {
    expect(calculateDynamicImageHeight(0, 100, 100)).toBe(0);
  });
});

describe('decodeTrademarkSymbols', () => {
  test('replaces &reg; with ®', () => {
    expect(decodeTrademarkSymbols('Example&reg;')).toBe('Example®');
  });

  test('replaces &trade; with ™', () => {
    expect(decodeTrademarkSymbols('Brand&trade;')).toBe('Brand™');
  });

  test('replaces both symbols correctly in a single string', () => {
    expect(decodeTrademarkSymbols('Test&trade; & Example&reg;')).toBe('Test™ & Example®');
  });

  test('returns original string if no symbols present', () => {
    expect(decodeTrademarkSymbols('No symbols')).toBe('No symbols');
  });
});

describe('useDebounce hook', () => {
  jest.useFakeTimers();

  test('debounces value after delay', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'initial', delay: 500 } }
    );

    expect(result.current).toBe('initial');

    rerender({ value: 'updated', delay: 500 });

    // Before debounce timeout
    expect(result.current).toBe('initial');

    // After debounce timeout
    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current).toBe('updated');
  });

  test('handles rapid value changes', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'first', delay: 300 } }
    );

    rerender({ value: 'second', delay: 300 });
    rerender({ value: 'third', delay: 300 });

    act(() => {
      jest.advanceTimersByTime(299);
    });

    expect(result.current).toBe('first');

    act(() => {
      jest.advanceTimersByTime(1);
    });

    expect(result.current).toBe('third');
  });
});

describe('mapProductOptionsToSkus', () => {
  it('should correctly map product options to skus with decoded symbols', () => {
    const expectedSkus: Sku[] = [
      {
        id: '123',
        name: 'Awesome Product®',
        price: 19.99,
        priceString: '$19.99',
        inventoryStatus: 'In Stock',
        images: [mockImage, mockImage]
      },
      {
        id: '456',
        name: 'Another Product™',
        price: 29.99,
        priceString: '$29.99',
        inventoryStatus: 'Out of Stock',
        images: []
      }
    ];

    expect(mapProductOptionsToSkus(mockProduct)).toEqual(expectedSkus);
  });

  it('should return an empty array if product is null', () => {
    expect(mapProductOptionsToSkus(null)).toEqual([]);
  });
});
