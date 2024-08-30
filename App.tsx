/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

// import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from './source/pages/Home';
import { Test } from './source';
import { Login } from './source/pages/Login';
const App = () => {
  const Stack = createNativeStackNavigator()
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen name='Test' component={Test} options={{ headerShown: false }} /> */}
        {/* <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} /> */}
        <Stack.Screen name='main' component={Home} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
export default App