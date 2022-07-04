/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {type PropsWithChildren} from 'react';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import {Toys} from './screens/Toys';
import store from './store';

export default function App() {
  return (
    <Provider store={store}>
      <Toys />
    </Provider>
  );
}
