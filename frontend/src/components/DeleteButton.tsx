import { Pressable, StyleSheet } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "../utils/constants";
import { useDispatch } from "react-redux";
import { NewProduct } from "../types";
import { AppDispatch } from "../redux/store";
import { deleteProductFromBag } from "../redux/actions";
import Fontisto from "@expo/vector-icons/Fontisto";

const DeleteButton = ({
  item,
  designs,
}: {
  item: NewProduct;
  designs?: object;
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleClick = () => {
    if (item.amount === 1) {
      dispatch(deleteProductFromBag({ product: item }));
    } else {
      dispatch(deleteProductFromBag({ product: item, type: true }));
    }
  };

  return (
    <Pressable style={designs ? designs : styles.box} onPress={handleClick}>
      {item && item.amount === 1 ? (
        <Fontisto name="trash" size={16} color={colors.darkPurple} />
      ) : (
        <AntDesign name="minus" size={16} color={colors.darkPurple} />
      )}
    </Pressable>
  );
};

export default DeleteButton;

const styles = StyleSheet.create({
  box: {
    width: 35,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
