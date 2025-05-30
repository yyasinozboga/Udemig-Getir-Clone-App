import { Dimensions, StyleSheet, View } from "react-native";
import React, { ReactElement } from "react";

const { width } = Dimensions.get("window");

const Footer = ({ children }: { children: ReactElement }) => {
  return <View style={styles.footer}>{children}</View>;
};

export default Footer;

const styles = StyleSheet.create({
  footer: {
    paddingVertical: 10,
    backgroundColor: "white",
    height: 100,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    width: width * 1,
  },
});
