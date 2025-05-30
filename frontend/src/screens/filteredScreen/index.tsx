import { FlatList, SafeAreaView, ScrollView, Text } from "react-native";
import React, { useCallback, useMemo, useState } from "react";
import Product from "../../components/Product";
import { ProductsType, ProductType } from "../../types";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { getProducts } from "../../redux/actions";
import Categories from "./Categories";
import SubCategories from "./SubCategories";
import categoriesGetir from "../../../assets/categoriesGetir";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/HomeRouter";
import { useFocusEffect } from "@react-navigation/native";
import { setTabBarIcon } from "../../redux/slices/tabBarIconSlice";

export type SubCategory = {
  value: string;
  title: string;
};

type Props = NativeStackScreenProps<RootStackParamList, "FilteredScreen">;

const FilteredScreen: React.FC<Props> = ({ route, navigation }) => {
  const { isLoading, error, products } = useSelector(
    (store: ProductsType) => store.products
  );
  const category: string = route.params.category;
  const [openModalId, setOpenModalId] = useState<string | null>(null);
  const [selected, setSelected] = useState<string>(category);
  const [subCategory, setSubCategory] = useState<string | null>(null);

  //! useEffect bileşen sadece ekrana ilk render edildiğinde veya bağımlılıklarıdaki her hangi bir veri değişirse tekrardan çalışır onun dışında bileşendeki her hangi bir state değişiyorsa ve o state değeri useEffect in bağımlılığında yoksa tekrar render edilmez

  //! subCategory değişince bu fonksiyonun çalışmaması ve bir array döndürmesi için useMemo hook u kullanıldı
  const subCategories: SubCategory[] | null = useMemo(() => {
    if (subCategory) {
      setSubCategory(null);
    }
    return categoriesGetir.find((i) => i.category === selected)
      ?.subCategories as SubCategory[];
  }, [selected]);

  const dispatch = useDispatch<AppDispatch>();

  useFocusEffect(
    useCallback(() => {
      dispatch(
        getProducts({
          category: selected,
          subCategory: subCategory as string,
        })
      );
    }, [selected, subCategory])
  );

  useFocusEffect(
    useCallback(() => {
      navigation.getParent()?.setOptions({
        tabBarButton: undefined,
      });
      dispatch(setTabBarIcon(true));
    }, [])
  );

  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      {products.length > 0 && (
        <ScrollView showsVerticalScrollIndicator={false}>
          <Categories selected={selected} setSelected={setSelected} />
          <SubCategories
            subCategory={subCategory}
            setSubCategory={setSubCategory}
            subCategories={subCategories as SubCategory[]}
          />
          <FlatList
            data={products}
            scrollEnabled={false}
            renderItem={({ item }: { item: ProductType }) => (
              <Product
                item={item}
                openModalId={openModalId}
                setOpenModalId={setOpenModalId}
              />
            )}
            numColumns={3}
            contentContainerStyle={{
              gap: 20,
              paddingVertical: 20,
            }}
            columnWrapperStyle={{
              justifyContent: "space-between",
              paddingHorizontal: 20,
            }}
          />
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default FilteredScreen;
