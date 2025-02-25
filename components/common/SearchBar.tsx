import React from "react";
import { View, TextInput, TouchableOpacity, Text, Keyboard, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {searchBarStyle} from "./styles";

type SearchBarProps = {
  query: string;
  setQuery: (text: string) => void;
  placeholder: string
};

const SearchBar: React.FC<SearchBarProps> = ({ query, setQuery, placeholder }) => {
  return (
    <View style={searchBarStyle.searchContainer}>
      <Ionicons name="search" size={20} color="#888" style={searchBarStyle.searchIcon} />
      <TextInput 
        placeholder={placeholder} 
        value={query} 
        onChangeText={setQuery} 
        onSubmitEditing={Keyboard.dismiss}
        style={searchBarStyle.searchInput} 
      />
      {query.length > 0 && (
        <TouchableOpacity onPress={() => setQuery("")} style={{...searchBarStyle.clearButton, height: Platform.OS === "android" ? 45 : 35}}>
          <Text style={searchBarStyle.clearText}>✕</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchBar;
