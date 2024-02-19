import {Image,StyleSheet,View} from 'react-native';
import React from 'react';
import Carousel from 'pinar';
import SliderImage from '../Content/SliderImage';


export default function Slider() {
  return (
    <View style={styles.carouselContainer}>
      <Carousel
        loop={true}
        autoplay={true}
        style={styles.carousel}
        showsControls={false}
        dotStyle={styles.dotStyle}>
        {SliderImage.map((img, index) => (
          <Image source={img.image} style={styles.image} key={index} />
        ))}
      </Carousel>
    </View>
  );
}

const styles = StyleSheet.create({
  dotStyle: {
    width: 30,
    height: 3,
    backgroundColor: 'silver',
    marginHorizontal: 3,
    borderRadius: 4,
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'stretch',
    borderRadius: 20,
  },
  carousel: {
    height: '100%',
    width: '100%',
  },
  carouselContainer: {
    height: 220,
    marginHorizontal: 10,
    marginTop: 2,
    backgroundColor:'transparent',
    marginBottom:12
  },
});
