import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SubCategory } from ".";
import { colors } from "../../utils/constants";

type Props = {
  subCategories: SubCategory[];
  setSubCategory: React.Dispatch<React.SetStateAction<string | null>>;
  subCategory: string | null;
};

const SubCategories = ({
  subCategories,
  subCategory,
  setSubCategory,
}: Props) => {
  return (
    <View style={{ backgroundColor: "white" }}>
      <FlatList
        data={subCategories}
        horizontal
        contentContainerStyle={styles.subCategories}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }: { item: SubCategory }) => (
          <Pressable
            onPress={() => setSubCategory(item.value)}
            style={[
              styles.subCategory,
              {
                backgroundColor:
                  subCategory === item.value
                    ? colors.darkPurple
                    : "transparent",
                borderColor:
                  subCategory === item.value ? "transparent" : "lightgray",
              },
            ]}
          >
            <Text
              style={[
                styles.subText,
                {
                  color:
                    subCategory === item.value ? "white" : colors.darkPurple,
                },
              ]}
            >
              {item.title}
            </Text>
          </Pressable>
        )}
      />
    </View>
  );
};

export default React.memo(SubCategories);

const styles = StyleSheet.create({
  subCategories: {
    height: 70,
    paddingHorizontal: 20,
    gap: 20,
    alignItems: "center",
    backgroundColor: "white",
    minWidth: "100%",
  },

  subCategory: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderWidth: 1,
    marginVertical: "auto",
  },

  subText: {
    fontWeight: "700",
    textAlign: "center",
  },
});
