import React, { useState, useEffect } from "react";
import { 
  View, 
  TextInput, 
  FlatList, 
  ActivityIndicator, 
  Keyboard, 
  TouchableOpacity,
  Text,
} from "react-native";
import { searchProducts } from "../../services/products";
import ProductCard from "../../components/products/ProductCard";
import { styles } from "./styles";
import { Product } from "../../types/Product";
import { ProductListProps } from "../../types/RootStackParamList";
import { useDebounce } from "../../utils/useDebounce";
import { Ionicons } from "@expo/vector-icons";

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
  }, []);

  useEffect(() => {
    if (debouncedQuery.trim() !== "") {
      fetchProducts(0, true);
    } else {
      setProducts([]);
    }
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
      setProducts(reset ? results.products : [...products, ...results.products]);
      setHasMore(results.products.length > 0);
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

  return (
    <View style={styles.container}>
      {/* Search */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
        <TextInput 
          placeholder="Search for products..." 
          value={query} 
          onChangeText={setQuery} 
          onSubmitEditing={Keyboard.dismiss}
          style={styles.searchInput} 
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={() => setQuery("")} style={styles.clearButton}>
            <Text style={styles.clearText}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {loading ? (
        <View style={styles.fullScreenLoader}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <ProductCard product={item} navigation={navigation} />}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={loadingMore ? <ActivityIndicator style={styles.loader} size="small" color="#007AFF" /> : null}
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
