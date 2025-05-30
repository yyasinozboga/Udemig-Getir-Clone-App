import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect } from "react";
import { Feather } from "@expo/vector-icons";
import { colors } from "../utils/constants";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { addProductToBag } from "../redux/actions";
import { NewProduct, ProductType } from "../types";
import DeleteButton from "./DeleteButton";
import { useFocusEffect } from "@react-navigation/native";
import { createProduct } from "../utils/helper";

type Props = {
  openModalId: string | null;
  setOpenModalId: React.Dispatch<React.SetStateAction<string | null>>;
  item: ProductType;
  found: NewProduct;
};

const Modal = ({ item, openModalId, setOpenModalId, found }: Props) => {
  const isOpen = openModalId === item.id;
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (openModalId) {
      setOpenModalId(null);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      return () => setOpenModalId(null);
    }, [])
  );

  const handleClick = () => {
    if (!isOpen) {
      setOpenModalId(item.id);
    }

    if (found) {
      dispatch(addProductToBag({ product: found, type: true }));
    } else {
      dispatch(addProductToBag({ product: createProduct(item) }));
    }
  };

  return (
    <View style={styles.modal}>
      <Pressable
        style={[
          styles.button,
          {
            borderTopStartRadius: 5,
            borderTopEndRadius: 5,
            borderBottomStartRadius: isOpen && found ? 0 : 5,
            borderBottomEndRadius: isOpen && found ? 0 : 5,
          },
        ]}
        onPress={handleClick}
      >
        {!isOpen ? (
          found?.amount ? (
            <Text style={styles.amount}>{found.amount}</Text>
          ) : (
            <Feather name="plus" size={20} color={colors.darkPurple} />
          )
        ) : (
          <Feather name="plus" size={20} color={colors.darkPurple} />
        )}
      </Pressable>

      {isOpen && found && (
        <View style={styles.amountContainer}>
          <Text style={styles.amountBox}>{found?.amount}</Text>
          <DeleteButton item={found} designs={styles.button} />
        </View>
      )}
    </View>
  );
};

export default Modal;

const styles = StyleSheet.create({
  modal: {
    position: "absolute",
    top: -10,
    right: -10,
    width: 30,
    height: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
  },

  button: {
    backgroundColor: "white",
    width: "100%",
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 10,
  },

  amountContainer: {
    alignItems: "center",
    overflow: "hidden",
    borderBottomStartRadius: 5,
    borderBottomEndRadius: 5,
    elevation: 10,
  },

  amountBox: {
    backgroundColor: colors.darkPurple,
    paddingVertical: 5,
    width: "100%",
    textAlign: "center",
    color: "white",
    fontWeight: "600",
  },

  amount: {
    color: colors.darkPurple,
    fontWeight: "600",
  },
});
