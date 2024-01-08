import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Home222 from '../screens/Home222';

const Stack = createNativeStackNavigator();

export default function Layout() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Home222" component={Home222} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}