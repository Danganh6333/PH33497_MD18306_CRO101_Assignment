import {
  StyleSheet,
  View,
} from 'react-native';
import React, { useState } from 'react';
import Slider from '../Others/Slider';
import HomePageDisplay from '../Container/TopNavigation';

const HomePage = () => {

  return (
    <View>
      <Slider />
      <HomePageDisplay />
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({});
