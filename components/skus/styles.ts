import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    skuCard: {
      flex: 1,
      flexDirection: "row",
      backgroundColor: "#fff",
      borderRadius: 8,
      padding: 12,
      marginBottom: 10,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    imageContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    skuDetails: {
      flex: 1,
      marginLeft: 12,
    },
    skuName: {
      fontSize: 16,
      fontWeight: "600",
      marginBottom: 4,
    },
    skuPrice: {
      fontSize: 14,
      fontWeight: "bold",
      color: "#2a9d8f",
      marginBottom: 4,
    },
    footerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        width: "100%",
    },
    stockContainer: {
        alignItems: "flex-start",
    },
    skuStatus: {
      paddingHorizontal: 6,
      paddingVertical: 4,
      borderRadius: 4,
      alignSelf: "flex-start",
    },
    inStock: {
      backgroundColor: "#D4EDDA",
    },
    outOfStock: {
      backgroundColor: "#F8D7DA",
    },
    skuStatusText: {
      fontSize: 12,
      fontWeight: "600",
      color: "#333",
    },
    addButton: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 12,
        height: 35,
        paddingVertical: 6,
        borderRadius: 6,
        alignSelf: "flex-end",
        backgroundColor: "#007AFF"
      },
      addButtonText: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "600",
        marginLeft: 6,
      },
  });