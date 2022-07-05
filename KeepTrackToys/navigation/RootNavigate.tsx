import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Toys} from '../screens/Toys';
import {Carts} from '../screens/Carts';
import {IScreen, RootStackParamList} from '../types';

interface IRootScreen extends IScreen {
  name: keyof RootStackParamList;
}
const screens: IRootScreen[] = [
  {
    name: 'Root',
    component: Toys,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'Carts',
    component: Carts,
    options: {
      headerShown: false,
    },
  },
];

const Stack = createStackNavigator<RootStackParamList>();
export default function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {screens.map(screen => (
        <Stack.Screen
          name={screen.name}
          key={screen.name}
          component={screen.component}
        />
      ))}
    </Stack.Navigator>
  );
}
