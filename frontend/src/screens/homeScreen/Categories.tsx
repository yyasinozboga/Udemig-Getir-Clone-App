import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import categoriesGetir from "../../../assets/categoriesGetir";
import { useNavigation } from "@react-navigation/native";
import { screens } from "../../utils/constants";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/HomeRouter";

type Prop = NativeStackNavigationProp<RootStackParamList, "HomeScreen">;

const Categories = () => {
  const navigation: Prop = useNavigation();

  type Item = {
    id: string;
    name: string;
    src: string;
    category: string;
    subCategories: { value: string; title: string }[];
  };

  return (
    <FlatList
      data={categoriesGetir}
      contentContainerStyle={styles.container}
      numColumns={4}
      showsVerticalScrollIndicator={false}
      columnWrapperStyle={{ gap: 20 }}
      renderItem={({ item }: { item: Item }) => (
        <TouchableOpacity
          style={styles.box}
          onPress={() =>
            navigation.navigate(screens.FilteredScreen, {
              category: item.category,
            })
          }
        >
          <Image style={styles.image} source={{ uri: item.src }} />
          <Text numberOfLines={1} style={styles.text}>
            {item.name}
          </Text>
        </TouchableOpacity>
      )}
      keyExtractor={(item) => item.id}
    />
  );
};

export default Categories;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    gap: 20,
    width: "90%",
    alignItems: "center",
    marginHorizontal: "auto",
  },

  box: {
    textAlign: "center",
    gap: 5,
    width: 75,
  },

  image: {
    width: "100%",
    height: 70,
    borderRadius: 10,
  },

  text: {
    fontSize: 11,
    textAlign: "center",
  },
});
