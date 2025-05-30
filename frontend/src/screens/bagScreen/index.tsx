import { View, FlatList, StyleSheet, ScrollView } from "react-native";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BagType } from "../../types";
import { AppDispatch } from "../../redux/store";
import { getProducts } from "../../redux/actions";
import Card from "./Card";
import SuggestedProducts from "./SuggestedProducts";
import { useFocusEffect } from "@react-navigation/native";
import { setTabBarIcon } from "../../redux/slices/tabBarIconSlice";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/HomeRouter";
import Total from "./Total";

type Prop = NativeStackScreenProps<RootStackParamList, "BagScreen">;

const BagScreen: React.FC<Prop> = ({ navigation }) => {
  const { products } = useSelector((store: BagType) => store.bag);

  const dispatch = useDispatch<AppDispatch>();

  const categories = [...new Set(products.map((i) => i.category))];

  useEffect(() => {
    if (categories.length === 1) {
      dispatch(getProducts({ category: categories[0] }));
    } else {
      dispatch(getProducts({ category: categories }));
    }
  }, [categories.length]);

  useFocusEffect(
    useCallback(() => {
      navigation.getParent()?.setOptions({
        tabBarButton: () => <Total />,
      });
      dispatch(setTabBarIcon(null));
    }, [])
  );

  useEffect(() => {
    if (products.length === 0) {
      navigation.goBack();
    }
  }, [products.length]);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.products}>
          <FlatList
            data={products}
            renderItem={({ item }) => <Card item={item} />}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <View style={styles.seperator} />}
          />
        </View>

        <SuggestedProducts addedProducts={products} />
      </ScrollView>
    </View>
  );
};

export default BagScreen;

const styles = StyleSheet.create({
  products: {
    backgroundColor: "white",
  },

  seperator: {
    width: "100%",
    height: 1,
    backgroundColor: "lightgray",
  },
});
