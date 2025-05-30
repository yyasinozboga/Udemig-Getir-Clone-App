import { Platform, StyleSheet, View } from "react-native";
import React from "react";
import { colors } from "../utils/constants";

const Header = ({ children }: { children: React.ReactNode }) => {
  return <View style={styles.header}>{children}</View>;
};

export default Header;

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.darkPurple,
    height: Platform.OS === "android" ? 80 : 90,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: Platform.OS === "android" ? 30 : 45,
    paddingHorizontal: 20,
  },
});
