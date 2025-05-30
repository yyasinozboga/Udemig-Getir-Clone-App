import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import {
  Dimensions,
  Image,
  Platform,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { colors, screens } from "../utils/constants";
import HomeScreen from "../screens/homeScreen";
import FilteredScreen from "../screens/filteredScreen";
import DetailScreen from "../screens/detailScreen";
import BagScreen from "../screens/bagScreen";
import AntDesign from "@expo/vector-icons/AntDesign";
import Fontisto from "@expo/vector-icons/Fontisto";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { BagType, NewProduct, ProductType } from "../types";
import { AppDispatch } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { deleteAllProductsFromBag, getProductsFromBag } from "../redux/actions";
import { calculateTotal } from "../utils/helper";
import Header from "../components/Header";

export type RootStackParamList = {
  [screens.HomeScreen]: undefined;
  [screens.FilteredScreen]: { category: string };
  [screens.BagScreen]: undefined;
  [screens.DetailScreen]: { item: NewProduct | ProductType };
};

const { width } = Dimensions.get("window");

const Stack = createNativeStackNavigator<RootStackParamList>();

type Prop = NativeStackScreenProps<
  RootStackParamList,
  keyof RootStackParamList
>;

const HomeRouter = () => {
  StatusBar.setBarStyle("light-content");
  const { products } = useSelector((store: BagType) => store.bag);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getProductsFromBag());
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        headerBackVisible: false,
        headerBackTitle: undefined,
        headerTitleStyle: { color: "white" },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name={screens.HomeScreen}
        component={HomeScreen}
        options={{
          header: () => (
            <Header>
              <View style={{ width: 70, height: 30, marginHorizontal: "auto" }}>
                <Image
                  source={require("../../assets/getirlogo.png")}
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                />
              </View>
            </Header>
          ),
        }}
      />
      <Stack.Screen
        name={screens.FilteredScreen}
        component={FilteredScreen}
        options={({ navigation }: Prop) => ({
          header: () => (
            <Header>
              <Pressable onPress={() => navigation.goBack()}>
                <FontAwesome6 name="angle-left" size={24} color="white" />
              </Pressable>

              <Text
                style={{
                  fontWeight: "600",
                  color: "white",
                  fontSize: 17,
                  position: "absolute",
                  top: Platform.OS === "android" ? 43 : 60,
                  left: width * 0.43,
                }}
              >
                Ürünler
              </Text>

              {products.length > 0 && (
                <Pressable
                  style={styles.bag}
                  onPress={() => navigation.navigate(screens.BagScreen)}
                >
                  <Image
                    source={require("../../assets/cart.png")}
                    style={{ width: 30, height: "100%" }}
                  />
                  <Text style={styles.total}>{calculateTotal(products)}</Text>
                </Pressable>
              )}
            </Header>
          ),
        })}
      />
      <Stack.Screen
        name={screens.DetailScreen}
        component={DetailScreen}
        options={({ navigation }: Prop) => ({
          header: () => (
            <Header>
              <Pressable onPress={() => navigation.goBack()}>
                <AntDesign name="close" size={24} color="white" />
              </Pressable>

              <Text
                style={{
                  fontWeight: "600",
                  color: "white",
                  fontSize: 17,
                }}
              >
                Ürün Detayı
              </Text>

              <Pressable>
                <AntDesign name="heart" size={24} color={colors.darkPurple} />
              </Pressable>
            </Header>
          ),
        })}
      />
      <Stack.Screen
        name={screens.BagScreen}
        component={BagScreen}
        options={({ navigation }: Prop) => ({
          header: () => (
            <Header>
              <Pressable onPress={() => navigation.goBack()}>
                <AntDesign name="close" size={24} color="white" />
              </Pressable>

              <Text
                style={{
                  fontWeight: "600",
                  color: "white",
                  fontSize: 17,
                }}
              >
                Sepetim
              </Text>

              <Pressable onPress={() => dispatch(deleteAllProductsFromBag())}>
                <Fontisto name="trash" size={24} color="white" />
              </Pressable>
            </Header>
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default HomeRouter;

const styles = StyleSheet.create({
  bag: {
    width: 90,
    overflow: "hidden",
    borderRadius: 6,
    flexDirection: "row",
    height: 30,
    backgroundColor: "white",
    justifyContent: "space-between",
    paddingEnd: 5,
    alignItems: "center",
  },

  total: {
    color: colors.darkPurple,
    fontWeight: "700",
  },
});
