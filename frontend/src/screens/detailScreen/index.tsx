import { View, Text, SafeAreaView, StyleSheet, ScrollView } from "react-native";
import React, { useCallback, useEffect } from "react";
import { RootStackParamList } from "../../navigation/HomeRouter";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { getDetail } from "../../redux/actions";
import { ProductStoreType, ProductType } from "../../types";
import { colors } from "../../utils/constants";
import Details from "./Details";
import ImageContainer from "./ImageContainer";
import { useFocusEffect } from "@react-navigation/native";
import { setTabBarIcon } from "../../redux/slices/tabBarIconSlice";
import AddButton from "./AddButton";

type Prop = NativeStackScreenProps<RootStackParamList, "DetailScreen">;

const DetailScreen: React.FC<Prop> = ({ route, navigation }) => {
  const { item } = route.params;
  const { product } = useSelector((store: ProductStoreType) => store.product);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getDetail(item.id));
  }, []);

  useFocusEffect(
    useCallback(() => {
      dispatch(setTabBarIcon(null));

      navigation.getParent()?.setOptions({
        tabBarButton: (props: any) => <AddButton {...props} item={item} />,
      });
    }, [])
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {product && (
        <ScrollView>
          <View style={styles.product}>
            <ImageContainer product={product as ProductType} />
            <View style={styles.infoContainer}>
              <Text style={styles.price}>{product?.price}</Text>
              <View style={styles.info}>
                <Text style={styles.name}>{product?.name}</Text>
                <Text style={styles.amount}>{product?.amount}</Text>
              </View>
            </View>
          </View>

          <Details />
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  product: {
    padding: 20,
    backgroundColor: "white",
    gap: 20,
  },

  infoContainer: {
    alignItems: "center",
    gap: 10,
  },

  price: {
    fontWeight: "700",
    color: colors.darkPurple,
    fontSize: 18,
  },

  name: {
    fontWeight: "500",
  },

  amount: {
    fontWeight: "500",
    color: colors.gray,
  },

  info: {
    alignItems: "center",
    gap: 5,
  },
});
