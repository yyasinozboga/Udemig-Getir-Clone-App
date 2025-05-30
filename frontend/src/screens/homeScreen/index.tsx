import { SafeAreaView } from "react-native";
import React from "react";
import Header from "./Header";
import Hero from "./Hero";
import Categories from "./Categories";

const HomeScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header />
      <Hero />
      <Categories />
    </SafeAreaView>
  );
};

export default HomeScreen;
