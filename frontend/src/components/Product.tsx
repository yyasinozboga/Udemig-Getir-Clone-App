import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { BagType, NewProduct, ProductType } from "../types";
import { colors, screens } from "../utils/constants";
import Modal from "./Modal";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/HomeRouter";

type CardProps = {
  item: ProductType;
  openModalId: string | null;
  setOpenModalId: React.Dispatch<React.SetStateAction<string | null>>;
};

type Prop = NativeStackNavigationProp<RootStackParamList, "FilteredScreen">;

const Product = ({ item, openModalId, setOpenModalId }: CardProps) => {
  const { products } = useSelector((store: BagType) => store.bag);
  const navigation: Prop = useNavigation();

  const found: NewProduct | undefined = products.find(
    (i: NewProduct) => i.id === item.id
  );

  const handleClick = () => {
    navigation.navigate(screens.DetailScreen, { item });
  };

  return (
    <TouchableOpacity style={styles.product} onPress={handleClick}>
      <Image
        source={{ uri: item.image }}
        style={[
          styles.image,
          { borderColor: found ? colors.darkPurple : "lightgray" },
        ]}
      />
      <View style={styles.priceContainer}>
        {item.discountPrice && (
          <Text style={styles.discountPrice}>{item.discountPrice}</Text>
        )}
        <Text style={styles.price}>{item.price}</Text>
      </View>
      <Text numberOfLines={1} style={styles.name}>
        {item.name}
      </Text>
      <Text style={styles.amount}>{item.amount}</Text>

      <Modal
        item={item}
        openModalId={openModalId}
        setOpenModalId={setOpenModalId}
        found={found as NewProduct}
      />
    </TouchableOpacity>
  );
};

export default React.memo(Product);

const styles = StyleSheet.create({
  product: {
    gap: 5,
    width: 100,
    position: "relative",
  },

  image: {
    height: 100,
    borderRadius: 10,
    borderWidth: 1,
  },

  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
  },

  discountPrice: {
    color: colors.gray,
    textDecorationLine: "line-through",
    fontSize: 13,
    fontWeight: "500",
  },

  price: {
    color: colors.darkPurple,
    fontWeight: "700",
    fontSize: 13,
  },

  name: {
    fontWeight: "600",
    fontSize: 12,
  },

  amount: {
    color: colors.gray,
  },
});
