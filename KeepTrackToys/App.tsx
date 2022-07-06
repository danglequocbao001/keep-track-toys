/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {Provider} from 'react-redux';
import store from './src/store';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from './src/navigation/RootNavigation';
import {RootNavigate} from './src/navigation/RootNavigate';

export default function App() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Provider store={store}>
        <RootNavigate />
      </Provider>
    </NavigationContainer>
  );
}
