import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import { colors } from "../../utils/constants";

const Details = () => {
  const details: string[] = [
    "İçindekiler",
    "Besin Değeri",
    "Kullanım",
    "Ek Bilgiler",
  ];

  return (
    <View>
      <Text style={styles.title}>Detaylar</Text>
      <FlatList
        data={details}
        scrollEnabled={false}
        contentContainerStyle={styles.details}
        ItemSeparatorComponent={() => <View style={styles.seperator} />}
        renderItem={({ item }: { item: string }) => (
          <Pressable style={styles.detail}>
            <Text style={styles.detailTitle}>{item}</Text>
            <Entypo name="chevron-thin-down" size={16} color={colors.gray} />
          </Pressable>
        )}
      />
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({
  detail: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
  },

  details: {
    backgroundColor: "white",
    paddingHorizontal: 10,
  },

  detailTitle: {
    color: colors.gray,
    fontWeight: "500",
  },

  title: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    color: colors.gray,
    fontWeight: "500",
  },

  seperator: {
    backgroundColor: "lightgray",
    height: 1,
  },
});
