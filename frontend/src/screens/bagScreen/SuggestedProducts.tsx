import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { NewProduct, ProductsType, ProductType } from "../../types";
import Product from "../../components/Product";
import { colors } from "../../utils/constants";

const SuggestedProducts = ({
  addedProducts,
}: {
  addedProducts: NewProduct[];
}) => {
  const { isLoading, error, products } = useSelector(
    (store: ProductsType) => store.products
  );
  const [openModalId, setOpenModalId] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    const newProducts: ProductType[] = [];
    products.forEach((product) => {
      const found = addedProducts.find((item) => item.id === product.id);
      if (!found) {
        newProducts.push(product);
      }
    });

    return newProducts;
  }, [addedProducts.length, products]);

  return (
    <View>
      <Text style={styles.title}>Önerilen Ürünler</Text>

      <View style={{ backgroundColor: "white" }}>
        {isLoading ? (
          <Text>Loading...</Text>
        ) : error ? (
          <Text>Error</Text>
        ) : (
          products.length > 0 && (
            <FlatList
              data={filteredProducts}
              horizontal
              keyExtractor={(item) => item.id}
              contentContainerStyle={{ gap: 20, padding: 20 }}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }: { item: ProductType }) => (
                <Product
                  item={item}
                  setOpenModalId={setOpenModalId}
                  openModalId={openModalId}
                />
              )}
            />
          )
        )}
      </View>
    </View>
  );
};

export default React.memo(SuggestedProducts);

const styles = StyleSheet.create({
  title: {
    color: colors.darkPurple,
    fontWeight: "600",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
});
