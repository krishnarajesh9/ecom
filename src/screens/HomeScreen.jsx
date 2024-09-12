import {View, Text, StyleSheet, TextInput, FlatList} from 'react-native';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Header from '../components/Header';
import Category from '../components/Category';
import data from '../data/data.json';
import ProductCard from '../components/ProductCard';

const categories = ['Trending Now', 'All', 'New', 'Mens', 'Womens'];
const HomeScreen = () => {
  const [products, setProducts] = useState(data.products);
  const [selectedCategory, setSelectedCategory] = useState();
  const [isLiked, setIsLiked] = useState(false);
  const handleLiked = (item) => {
    const newProducts = products.map(prod => {
      if (prod.id === item.id) {
        return {
          ...prod,
          isLiked: true,
        };
      }
      return prod;
    });
    setProducts(newProducts);
  };
  return (
    <LinearGradient colors={['#FDF0F3', '#FFFBFC']} style={styles.container}>
      <Header />
      <FlatList
        numColumns={2}
        ListHeaderComponent={
          <>
            <Text style={styles.matchText}>Match Your Style</Text>
            {/* input container */}
            <View style={styles.inputContainer}>
              <View style={styles.iconContainer}>
                <Fontisto name={'search'} size={26} color={'#C0C0C0'} />
              </View>

              <TextInput style={styles.inputText} placeholder="search" />
            </View>
            {/* category section */}
            <FlatList
              data={categories}
              renderItem={({item}) => (
                <Category item={item} handleLiked={handleLiked} />
              )}
              keyExtractor={item => item}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            />
          </>
        }
        data={products}
        renderItem={({item, index}) => (
          <ProductCard item={item} isLiked={isLiked} setIsLiked={setIsLiked} />
        )}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item)=>item.id}
      />
    </LinearGradient>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  matchText: {
    fontSize: 28,
    color: '#000000',
    marginTop: 25,
  },
  inputContainer: {
    backgroundColor: '#ffffff',
    height: 48,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  iconContainer: {
    marginHorizontal: 15,
  },
  inputText: {
    flex: 1,
  },
});
