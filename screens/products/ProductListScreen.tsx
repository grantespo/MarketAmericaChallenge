import React, { useState, useEffect, useCallback } from 'react';
import {
  Alert,
  View,
  FlatList,
  ActivityIndicator,
  Text,
  Keyboard,
} from 'react-native';

import { styles } from './styles';
import LargeLoadingSpinner from '../../components/common/LargeLoadingSpinner';
import SearchBar from '../../components/common/SearchBar';
import ProductCard from '../../components/products/ProductCard';
import { searchProducts } from '../../services/products';
import { Product } from '../../types/Product';
import { useDebounce } from '../../utils/useDebounce';

export default function ProductListScreen() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 500);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    fetchProducts(0);
  }, [debouncedQuery]);

  const fetchProducts = async (pageNumber: number) => {
    try {
      const results = await searchProducts(debouncedQuery, pageNumber);

      if (results?.error) {
        Alert.alert('Error', results.error);
        setHasError(true); // Block further API calls after an error
      } else if (results?.products) {
        setProducts(
          page === 0 ? results.products : [...products, ...results.products],
        );
        setHasMore(results.products.length > 0);
        setHasError(false);
      }
    } catch (e: any) {
      Alert.alert('Error', e?.message ?? 'Uknown Error');
      setHasError(true);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const loadMore = () => {
    if (!loading && !loadingMore && hasMore && !hasError) {
      setLoadingMore(true);
      const nextPage = page + 1;
      setPage(nextPage);
      setLoading(true);
      fetchProducts(nextPage);
    }
  };

  const renderFooter = useCallback(
    () =>
      loadingMore ? (
        <ActivityIndicator style={styles.loader} size="small" color="#007AFF" />
      ) : null,
    [loadingMore],
  );

  return (
    <View style={styles.container}>
      <SearchBar
        query={query}
        placeholder="Search for products..."
        setQuery={(q) => {
          setLoading(true);
          if (q === '') {
            setPage(0);
            setProducts([]);
            Keyboard.dismiss();
          }
          setQuery(q);
        }}
      />

      {loading && !loadingMore ? (
        <LargeLoadingSpinner />
      ) : products.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            No products found. Please try a different search query.
          </Text>
        </View>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <ProductCard product={item} />}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
          removeClippedSubviews={true} // Improves performance
          initialNumToRender={10} // Render only a few items first
          maxToRenderPerBatch={10} // Renders items in batches
          windowSize={10} // Keeps fewer items in memory
          updateCellsBatchingPeriod={100} // Reduces CPU load
        />
      )}
    </View>
  );
}
