import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { NewProduct } from "../../types";
import { colors, screens } from "../../utils/constants";
import { Feather } from "@expo/vector-icons";
import DeleteButton from "../../components/DeleteButton";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { addProductToBag } from "../../redux/actions";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/HomeRouter";

type Prop = NativeStackNavigationProp<RootStackParamList, "BagScreen">;

const Card = ({ item }: { item: NewProduct }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation: Prop = useNavigation();

  const handleClick = () => {
    dispatch(addProductToBag({ product: item, type: true }));
  };

  return (
    <TouchableOpacity
      style={styles.product}
      onPress={() =>
        navigation.navigate(screens.DetailScreen, { item: item as NewProduct })
      }
    >
      <View style={styles.productRight}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.productInfo}>
          <View>
            <Text numberOfLines={1} style={styles.name}>
              {item.name}
            </Text>
            <Text style={styles.info}>{item.info}</Text>
          </View>

          <View style={styles.priceContainer}>
            {item.discountPrice && (
              <Text style={styles.discountPrice}>{item.discountPrice}</Text>
            )}
            <Text style={styles.price}>{item.price}</Text>
          </View>
        </View>
      </View>

      <View style={styles.amountContainer}>
        <DeleteButton item={item} />
        <View style={styles.amountBox}>
          <Text style={styles.amount}>{item.amount}</Text>
        </View>
        <Pressable style={styles.box} onPress={handleClick}>
          <Feather name="plus" size={16} color={colors.darkPurple} />
        </Pressable>
      </View>
    </TouchableOpacity>
  );
};

export default Card;

const styles = StyleSheet.create({
  product: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },

  productRight: {
    flexDirection: "row",
    gap: 10,
    width: 150,
  },

  productInfo: {
    justifyContent: "space-between",
  },

  image: {
    width: 70,
    height: 70,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "lightgray",
  },

  name: {
    fontWeight: "500",
  },

  info: {
    color: colors.gray,
    fontWeight: "500",
  },

  price: {
    fontWeight: "700",
    color: colors.darkPurple,
  },

  amountContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    backgroundColor: "white",
    height: 30,
    elevation: 10,
  },

  amountBox: {
    backgroundColor: colors.darkPurple,
    height: "100%",
    width: 35,
    justifyContent: "center",
    alignItems: "center",
  },

  amount: {
    color: "white",
    fontWeight: "600",
    fontSize: 13,
  },

  box: {
    width: 35,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  priceContainer: {
    flexDirection: "row",
    gap: 5,
    flexWrap: "wrap",
    alignItems: "center",
  },

  discountPrice: {
    fontWeight: "700",
    color: colors.gray,
    textDecorationLine: "line-through",
  },
});
