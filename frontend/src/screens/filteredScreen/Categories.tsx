import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import categoriesGetir from "../../../assets/categoriesGetir";
import { colors } from "../../utils/constants";
import { SubCategory } from ".";

type Category = {
  id: string;
  name: string;
  src: string;
  category: string;
  subCategories: SubCategory[];
};

const Categories = ({
  selected,
  setSelected,
}: {
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <View style={{ backgroundColor: colors.lightPurple }}>
      <FlatList
        data={categoriesGetir}
        horizontal
        contentContainerStyle={styles.categories}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }: { item: Category }) => (
          <Pressable
            onPress={() => setSelected(item.category)}
            style={{
              paddingBottom: 5,
              borderBottomWidth: 2,
              borderBottomColor:
                selected === item.category ? colors.yellow : "transparent",
            }}
          >
            <Text style={styles.category}>{item.name}</Text>
          </Pressable>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default React.memo(Categories);

const styles = StyleSheet.create({
  categories: {
    backgroundColor: colors.lightPurple,
    height: 50,
    alignItems: "center",
    gap: 20,
    paddingHorizontal: 20,
  },

  category: {
    color: "white",
    fontWeight: "600",
  },

  border: {
    height: 2,
    backgroundColor: colors.yellow,
    width: "100%",
  },
});
