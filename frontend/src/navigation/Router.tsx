import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Pressable, SafeAreaView, View } from "react-native";
import { colors, screens } from "../utils/constants";
import HomeRouter from "./HomeRouter";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import Fontisto from "@expo/vector-icons/Fontisto";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useSelector } from "react-redux";
import { TabBarIconType } from "../types";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const Tab = createBottomTabNavigator();

type RootTabParamList = {
  [screens.HomeScreen]: undefined;
};

type Prop = NativeStackNavigationProp<RootTabParamList, "HomeScreen">;

const Router = () => {
  const { tabBarIcon } = useSelector(
    (store: TabBarIconType) => store.tabBarIcon
  );

  const navigation: Prop = useNavigation();

  const CreateTabBarButton = (props: any) => {
    return (
      <SafeAreaView
        style={{
          backgroundColor: colors.darkPurple,
          borderColor: "white",
          borderWidth: 4,
          borderRadius: 50,
          width: 60,
          height: 60,
          justifyContent: "center",
          alignItems: "center",
          marginTop: -10,
          marginHorizontal: "auto",
        }}
      >
        <Pressable
          {...props}
          style={{ justifyContent: "center", alignItems: "center" }}
          onPress={() => navigation.navigate(screens.HomeScreen)}
        >
          <Fontisto name="nav-icon-list-a" size={24} color={colors.yellow} />
        </Pressable>
      </SafeAreaView>
    );
  };

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        header: () => <View />,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 90,
        },
        tabBarButton: tabBarIcon ? undefined : () => null,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeRouter}
        options={{
          tabBarIcon: () => (
            <Pressable onPress={() => navigation.navigate(screens.HomeScreen)}>
              <Entypo name="home" size={24} color={colors.darkPurple} />
            </Pressable>
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={HomeRouter}
        options={{
          tabBarIcon: () => (
            <Pressable onPress={() => navigation.navigate(screens.HomeScreen)}>
              <AntDesign name="search1" size={24} color={colors.gray} />
            </Pressable>
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={HomeRouter}
        options={{
          tabBarButton: (props) =>
            tabBarIcon ? <CreateTabBarButton {...props} /> : null,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={HomeRouter}
        options={{
          tabBarIcon: () => (
            <Pressable onPress={() => navigation.navigate(screens.HomeScreen)}>
              <AntDesign name="user" size={24} color={colors.gray} />
            </Pressable>
          ),
        }}
      />
      <Tab.Screen
        name="Gift"
        component={HomeRouter}
        options={{
          tabBarIcon: () => (
            <Pressable onPress={() => navigation.navigate(screens.HomeScreen)}>
              <MaterialCommunityIcons
                name="gift"
                size={24}
                color={colors.gray}
              />
            </Pressable>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Router;
