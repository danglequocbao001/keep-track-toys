import {StackScreenProps} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from 'react-native';

import storage from '../storage';
import {StackParamList} from '../types';

export function Carts({}: StackScreenProps<StackParamList, 'Carts'>) {
  const [carts, setCarts] = useState([]);

  useEffect(() => {
    getAllCarts();
  }, []);
  const getAllCarts = async () => {
    try {
      const data = await storage.get('carts');
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <View>
      <Text>hh</Text>
    </View>
  );
}
