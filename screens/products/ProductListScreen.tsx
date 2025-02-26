import React, { useState, useEffect, useCallback } from "react";
import { 
  Alert,
  View, 
  FlatList, 
  ActivityIndicator, 
  Text
} from "react-native";
import { searchProducts } from "../../services/products";
import ProductCard from "../../components/products/ProductCard";
import { styles } from "./styles";
import { Product } from "../../types/Product";
import { ProductListProps } from "../../navigation/RootStackParamList";
import { useDebounce } from "../../utils/useDebounce";
import LargeLoadingSpinner from "../../components/common/LargeLoadingSpinner";
import SearchBar from "../../components/common/SearchBar";

export default function ProductListScreen({ navigation }: ProductListProps) {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingMore, setLoadingMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchProducts(0, true);
  }, [debouncedQuery]);

  const fetchProducts = async (pageNumber: number, reset = false) => {
    if (!hasMore && !reset) return;
    if (reset) {
      setLoading(true);
    } else {
      setLoadingMore(true)
    }
    
    const results = await searchProducts(debouncedQuery, pageNumber);
    if (results) {
      if (results.error) {
        Alert.alert("Error", results.error);
      } else if (results.products) {
        setProducts(reset ? results.products : [...products, ...results.products]);
        setHasMore(results.products.length > 0);
      }
    }
    
    setLoadingMore(false);
    setLoading(false);
  };

  const loadMore = () => {
    if (!loadingMore && hasMore) {
      setPage(prev => prev + 1);
      fetchProducts(page + 1);
    }
  };

  const renderFooter = useCallback(() => (
    loadingMore ? <ActivityIndicator style={styles.loader} size="small" color="#007AFF" /> : null
  ), [loadingMore]);

  return (
    <View style={styles.container}>
      <SearchBar 
        query={query} 
        placeholder="Search for products..."
        setQuery={setQuery} />

      {loading ? (
        <View testID="large-loading-spinner">
          <LargeLoadingSpinner/>
        </View>
      ) : (
        products.length == 0 ? 
        (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No products found. Please try a different search query.</Text>
        </View>
        )
        :
        (<FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <ProductCard product={item} navigation={navigation} />}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
          removeClippedSubviews={true} // Improves performance
          initialNumToRender={10} // Render only a few items first
          maxToRenderPerBatch={10} // Renders items in batches
          windowSize={10} // Keeps fewer items in memory
          updateCellsBatchingPeriod={100} // Reduces CPU load
        />)
      )}
    </View>
  );
}
