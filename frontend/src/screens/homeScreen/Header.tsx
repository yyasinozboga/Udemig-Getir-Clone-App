import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "../../utils/constants";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

const Header = () => {
  return (
    <View>
      <View style={styles.header}>
        <View style={styles.search}>
          <Image
            style={styles.image}
            source={{ uri: "https://cdn.getir.com/misc/emoji/house.png" }}
          />

          <Text style={{ color: colors.gray }}>
            <Text style={styles.strongText}>Ev</Text> Dedepaşa Blv. Yenişehir
            Mahallesi...
          </Text>

          <FontAwesome6
            name="angle-right"
            size={16}
            color={colors.darkPurple}
          />
        </View>

        <View style={styles.headerRight}>
          <Text style={styles.littleText}>TVS</Text>
          <Text style={styles.bigText}>13dk</Text>
        </View>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    height: 50,
    backgroundColor: colors.yellow,
  },

  search: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    width: "85%",
    backgroundColor: "white",
    paddingHorizontal: 10,
    borderTopRightRadius: 50,
    borderBottomEndRadius: 50,
  },

  image: {
    width: 30,
    height: 30,
  },

  strongText: {
    fontWeight: "600",
    color: "black",
  },

  headerRight: {
    alignItems: "center",
    justifyContent: "center",
    width: "15%",
  },

  littleText: {
    color: colors.darkPurple,
    fontSize: 10,
    fontWeight: "600",
  },

  bigText: {
    color: colors.darkPurple,
    fontWeight: "700",
    fontSize: 18,
  },
});
