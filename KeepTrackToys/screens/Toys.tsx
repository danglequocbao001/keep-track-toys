import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {update} from '../toyListSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from 'react-native';

export function Toys() {
  //   const toys = useSelector(selectToy);
  const dispath = useDispatch();
  const [update] = useState({});
  const [toys, setToys] = useState([
    {
      id: '0',
      toyName: 'toy1',
      toySpecies: 'hello',
      toyDescription: 'toy1 toy1 toy1',
    },
  ]);

  useEffect(() => {
    getAllToy();
  }, []);

  async function getAllToy() {
    try {
      const toys = await AsyncStorage.getItem('toys');
      console.log(toys);
      if (toys !== null) {
        return toys;
      }
    } catch (e) {
      console.log(e);
    }
  }

  function addToy(toy: any) {}

  function renderToy({item}: {item: any}) {
    return (
      <View key={item.id}>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          <Text>{item.toyName}</Text>
          <Text>{item.toySpecies}</Text>
          <Text>{item.toyDescription}</Text>
          <TouchableOpacity
            style={{backgroundColor: '#33cc33', padding: 5, borderRadius: 5}}>
            <Text style={{color: '#fff'}}>Sửa</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{backgroundColor: '#ff0000', padding: 5, borderRadius: 5}}>
            <Text style={{color: '#fff'}}>Xoá</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={{padding: 30}}>
      <TouchableOpacity
        style={{
          backgroundColor: '#3399ff',
          padding: 5,
          borderRadius: 5,
          width: 60,
          marginBottom: 20,
        }}>
        <Text style={{color: '#fff'}}>+ Thêm</Text>
      </TouchableOpacity>
      <SafeAreaView>
        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={toys}
          numColumns={1}
          renderItem={renderToy}
          keyExtractor={(item, index) => String(index)}
        />
      </SafeAreaView>
    </View>
  );
}
