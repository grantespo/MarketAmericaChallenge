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
import { HomeProps } from "../../types/RootStackParamList";
import { useDebounce } from "../../utils/useDebounce";
import { Ionicons } from "@expo/vector-icons"; // Import for icons

export default function HomeScreen({ navigation }: HomeProps) {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);
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
    setLoading(true);
    
    const results = await searchProducts(debouncedQuery, pageNumber);
    if (results) {
      setProducts(reset ? results.products : [...products, ...results.products]);
      setHasMore(results.products.length > 0);
    }
    
    setLoading(false);
    setFirstLoad(false);
  };

  const loadMore = () => {
    if (!loading && hasMore) {
      setPage(prev => prev + 1);
      fetchProducts(page + 1);
    }
  };

  return (
    <View style={styles.container}>
      {/* Search Input */}
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

      {/* Full-screen loader on first load */}
      {firstLoad ? (
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
          ListFooterComponent={loading ? <ActivityIndicator style={styles.loader} size="small" color="#007AFF" /> : null}
        />
      )}
    </View>
  );
}
