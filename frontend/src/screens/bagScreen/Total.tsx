import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Footer from "../../components/Footer";
import { colors } from "../../utils/constants";
import { calculateTotal } from "../../utils/helper";
import { useSelector } from "react-redux";
import { BagType } from "../../types";

const Total = () => {
  const { products } = useSelector((store: BagType) => store.bag);

  return (
    <Footer>
      <View style={styles.shadowWrapper}>
        <View style={styles.footer}>
          <View style={[styles.footerLeft, styles.box]}>
            <Text style={styles.footerLeftText}>Devam</Text>
          </View>
          <View style={[styles.box, styles.footerRight]}>
            <Text style={styles.total}>{calculateTotal(products)}</Text>
          </View>
        </View>
      </View>
    </Footer>
  );
};

export default Total;

const styles = StyleSheet.create({
  shadowWrapper: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0.1 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    borderRadius: 10,
    backgroundColor: "transparent",
    height: "100%",
  },

  footer: {
    flexDirection: "row",
    borderRadius: 10,
    width: "85%",
    marginHorizontal: "auto",
    overflow: "hidden",
    elevation: 5,
  },

  footerLeft: {
    backgroundColor: colors.darkPurple,
    width: "60%",
  },

  box: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  footerLeftText: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
  },

  footerRight: {
    backgroundColor: "white",
    width: "40%",
  },

  total: {
    color: colors.darkPurple,
    fontSize: 18,
    fontWeight: "700",
  },
});
