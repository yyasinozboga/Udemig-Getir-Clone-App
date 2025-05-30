import { Pressable, StyleSheet, Text } from "react-native";
import React from "react";
import Footer from "../../components/Footer";
import { BagType, NewProduct, ProductType } from "../../types";
import { useDispatch, useSelector } from "react-redux";
import { colors } from "../../utils/constants";
import { addProductToBag } from "../../redux/actions";
import { AppDispatch } from "../../redux/store";
import { createProduct } from "../../utils/helper";

const AddButton = ({ item }: { item: NewProduct | ProductType }) => {
  const { products } = useSelector((store: BagType) => store.bag);
  const dispatch = useDispatch<AppDispatch>();

  const found: NewProduct | undefined = products.find(
    (product: NewProduct) => product.id === item.id
  );

  const handleClick = () => {
    if (found) {
      dispatch(addProductToBag({ product: found, type: true }));
    } else {
      dispatch(
        addProductToBag({ product: createProduct(item as ProductType) })
      );
    }
  };

  return (
    <Footer>
      <Pressable
        style={{
          backgroundColor: colors.darkPurple,
          borderRadius: 10,
          padding: 18,
          width: "90%",
          marginHorizontal: "auto",
          height: 55,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={handleClick}
      >
        <Text
          style={{
            color: "white",
            fontWeight: "600",
            textAlign: "center",
          }}
        >
          {found ? found.amount : "Sepete Ekle"}
        </Text>
      </Pressable>
    </Footer>
  );
};

export default AddButton;

const styles = StyleSheet.create({});
