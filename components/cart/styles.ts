import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    skuCard: {
      flex: 1,
      flexDirection: "row",
      backgroundColor: "#fff",
      borderRadius: 8,
      padding: 12,
      marginBottom: 10,
      marginVertical: 8,
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
      marginBottom: 2,
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
    qtyView: {
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 6,
        paddingHorizontal: 2,
        marginTop: 5,
      },
      qtyButton: {
        backgroundColor: "#f4f4f4",
        borderRadius: 6,
        paddingHorizontal: 10,
        paddingVertical: 8, 
      },
      qtyText: {
        fontSize: 16,
        marginHorizontal: 10,
      },
    removeButton: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 12,
        height: 35,
        paddingVertical: 6,
        borderRadius: 6,
        alignSelf: "flex-end",
        backgroundColor: "red"
      },
      removeButtonText: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "600",
        marginLeft: 6,
      },
  });