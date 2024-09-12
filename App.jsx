import {View, Text} from 'react-native';
import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './src/screens/HomeScreen';
import ReorderScreen from './src/screens/ReorderScreen';
import CartScreen from './src/screens/CartScreen';
import AccountScreen from './src/screens/AccountScreen';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import ProductDetailsScreen from './src/screens/ProductDetailsScreen';
import {CartContext, CartProvider} from './src/context/cartContext';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const MyHomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Product_Details" component={ProductDetailsScreen} />
    </Stack.Navigator>
  );
};
const App = () => {
  return (
    <CartProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{headerShown: false, tabBarShowLabel: false}}
          initialRouteName="">
          <Tab.Screen
            name="HOME_STACK"
            component={MyHomeStack}
            options={{
              tabBarIcon: ({size, focused, color}) => {
                return (
                  <Entypo
                    name={'home'}
                    size={size}
                    color={color}
                    focused={focused}
                  />
                );
              },
            }}
          />
          <Tab.Screen
            name="REORDER"
            component={ReorderScreen}
            options={{
              tabBarIcon: ({size, color}) => {
                return (
                  <MaterialIcons name={'reorder'} size={size} color={color} />
                );
              },
            }}
          />
          <Tab.Screen
            name="CART"
            component={CartScreen}
            options={{
              tabBarIcon: ({size, color}) => {
                const {carts} = useContext(CartContext);
                return (
                  <View style={{position: 'relative'}}>
                    <MaterialCommunityIcons
                      name={'cart'}
                      size={size}
                      color={color}
                    />
                    <View
                      style={{
                        height: 14,
                        width: 14,
                        borderRadius: 7,
                        backgroundColor: color,
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'absolute',
                        top: -10,
                        right: -5,
                      }}>
                      <Text
                        style={{
                          fontSize: 10,
                          color: 'white',
                          fontWeight: '500',
                        }}>
                        {carts.length}
                      </Text>
                    </View>
                  </View>
                );
              },
            }}
          />
          <Tab.Screen
            name="ACCOUNT"
            component={AccountScreen}
            options={{
              tabBarIcon: ({size, color}) => {
                return <FontAwesome6 name={'user'} size={size} color={color} />;
              },
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
};

export default App;
