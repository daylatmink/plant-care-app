import React from 'react'
import { Provider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { theme } from './src/core/theme'
import { useEffect } from 'react'
import * as NavigationBar from 'expo-navigation-bar';
import {
  StartScreen,
  LoginScreen,
  RegisterScreen,
  ResetPasswordScreen,
  Watering,
  Dashboard,
  Profile, PlantDetail
} from './src/screens'
const Stack = createStackNavigator()
export default function App() {
  useEffect(() => {
    NavigationBar.setVisibilityAsync("hidden");  // Ẩn thanh điều hướng
    NavigationBar.setBehaviorAsync("overlay-swipe"); // Vuốt lên để hiện tạm
  }, []);
  return (
    <Provider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="StartScreen"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="PlantDetail" component={PlantDetail} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Watering" component={Watering} />
          <Stack.Screen name="StartScreen" component={StartScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen
            name="ResetPasswordScreen"
            component={ResetPasswordScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}
