import { Dimensions, FlatList, Image, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { ProductType } from "../../types";
import { colors } from "../../utils/constants";

const { width, height } = Dimensions.get("window");

const ImageContainer = ({ product }: { product: ProductType }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const onView = (viewableItems: any) => {
    if (viewableItems.changed.length > 0) {
      setActiveIndex(viewableItems.changed[0].index);
    }
  };
  const viewConfig = { viewAreaCoveragePercentThreshold: 50 };

  return (
    <View style={styles.imageContainer}>
      <FlatList
        data={product?.images}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        keyExtractor={(item, key) => key.toString()}
        onViewableItemsChanged={onView}
        viewabilityConfig={viewConfig}
        contentContainerStyle={{
          height: height * 0.18,
        }}
        renderItem={({ item }) => (
          <View style={styles.imageBox}>
            <Image style={styles.image} source={{ uri: item }} />
          </View>
        )}
      />

      <View style={styles.dots}>
        {product?.images.map((item, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              {
                backgroundColor:
                  activeIndex === index ? colors.darkPurple : "lightgray",
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

export default ImageContainer;

const styles = StyleSheet.create({
  imageContainer: {
    backgroundColor: "white",
  },

  imageBox: {
    width: width * 0.9,
    justifyContent: "center",
    alignItems: "center",
  },

  image: {
    width: width * 0.5,
    height: "100%",
    objectFit: "contain",
  },

  dots: {
    flexDirection: "row",
    gap: 5,
    justifyContent: "center",
  },

  dot: {
    width: 10,
    height: 10,
    borderRadius: 50,
    backgroundColor: colors.darkPurple,
  },
});
