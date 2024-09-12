import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation, useRoute} from '@react-navigation/native';
import Header from '../components/Header';
import {CartContext} from '../context/cartContext';

const imageurl =
  'https://res.cloudinary.com/dlc5c1ycl/image/upload/v1710567613/cwlk21f74nd9iamrlzkh.png';
const sizes = ['S', 'M', 'L', 'XL'];
const colorsArray = [
  '#91A1B0',
  '#B11D1D',
  '#1F44A3',
  '#9F632A',
  '#1D752B',
  '#000000',
];
const ProductDetailsScreen = () => {
  const {addToCartItem} = useContext(CartContext);
  const route = useRoute();
  const navigation = useNavigation();
  const product = route.params.item;
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('#B11D1D');
  const handleAddToCart = () => {
    product.size = selectedSize;
    product.color = selectedColor;
    addToCartItem(product);
    navigation.navigate('CART');
  };
  return (
    <LinearGradient colors={['#FDF0F3', '#FFFBFC']} style={styles.container}>
      <View style={styles.headerContainer}>
        <Header />
      </View>
      <Image source={{uri: item.image}} style={styles.coverImage} />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={[styles.title, styles.price]}>{item.price}</Text>
      </View>
      {/* size container */}
      <Text style={[styles.title, styles.sizeText]}>Size</Text>
      <View style={styles.sizeContainer}>
        {sizes.map((size, index) => {
          return (
            <TouchableOpacity
              style={styles.sizeValueContainer}
              key={index}
              onPress={() => {
                setSelectedSize(size);
              }}>
              <Text
                style={[
                  styles.sizeValue,
                  selectedSize == size && {color: '#E55B5B'},
                ]}>
                {size}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <Text style={[styles.title, styles.colorText]}>Colors</Text>
      <View style={styles.colorContainer}>
        {colorsArray.map((color, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => setSelectedColor(color)}>
              <View
                style={[
                  styles.borderColorCircle,
                  selectedColor === color && {
                    borderColor: color,
                    borderWidth: 2,
                    borderRadius: 24,
                  },
                ]}>
                <View
                  style={[styles.colorCircle, {backgroundColor: color}]}></View>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
      {/* button container */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          handleAddToCart(item);
        }}>
        <Text style={styles.buttonText}>Add to Cart</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    padding: 20,
  },
  coverImage: {
    width: '100%',
    height: 430,
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginVertical: 20,
  },
  title: {
    fontSize: 20,
    color: '#444444',
    fontWeight: '500',
  },
  price: {
    color: '#4D4C4C',
  },
  sizeText: {
    marginHorizontal: 20,
  },
  sizeContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
  },
  sizeValue: {
    fontSize: 18,
    fontWeight: '600',
  },
  sizeValueContainer: {
    height: 36,
    width: 36,
    borderRadius: 18,
    marginHorizontal: 10,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  colorText: {
    marginHorizontal: 20,
    marginTop: 10,
  },
  circle: {
    height: 36,
    width: 36,
    borderRadius: 20,
  },
  colorContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
  },
  circleBorder: {
    height: 48,
    width: 48,
    borderRadius: 24,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#E96E6E',
    padding: 10,
    margin: 10,
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
  },
});
