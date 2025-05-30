import { Dimensions, FlatList, Image, StyleSheet, View } from "react-native";
import React from "react";

const { width } = Dimensions.get("window");

const Hero = () => {
  const images = [
    "https://cdn.getir.com/misc/611e55d33ea65bef40f9ba05_banner_tr_1629378026496.jpeg",
    "https://cdn.getir.com/misc/621784419e62143ed76eef01_banner_tr_1645969386292.jpeg",
    "https://cdn.getir.com/promos/6221aef965805c5b1e703845_banner_tr_1646723453154.jpeg",
    "https://cdn.getir.com/misc/622a6d18b2e2fe3a8e809894_banner_tr_1646947639211.jpeg",
  ];

  return (
    <View>
      <FlatList
        horizontal
        data={images}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ height: 200 }}
        pagingEnabled
        renderItem={({ item }) => (
          <Image style={styles.image} source={{ uri: item }} />
        )}
        bounces={false}
      />
    </View>
  );
};

export default Hero;

const styles = StyleSheet.create({
  image: {
    width: width * 1,
  },
});
