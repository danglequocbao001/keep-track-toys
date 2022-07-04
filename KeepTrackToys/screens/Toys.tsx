import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from 'react-native';

interface IToys {
  id: string;
  toyName: string;
  toySpecies: string;
  toyDescription: string;
}

export function Toys() {
  //   const toys = useSelector(selectToy);
  const dispath = useDispatch();
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
    console.log('toys', toys);
  }, []);

  useEffect(() => {
    console.log('ad', toys);
    
  }, [toys])

  const getAllToy = async () => {
    try {
      const data: any = await AsyncStorage.getItem('toys');
      setToys(data);
      console.log('data', data);
      // if (data !== null) {
      // } else {
      //   await AsyncStorage.setItem(
      //     'toys',
      //     JSON.stringify([
      //       {
      //         id: '0',
      //         toyName: 'toy1',
      //         toySpecies: 'hello',
      //         toyDescription: 'toy1 toy1 toy1',
      //       },
      //     ]),
      //   );
      // }
    } catch (e) {}
  };

  const renderToy = ({item}: {item: any}) => {
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
          // showsVerticalScrollIndicator={false}
          // showsHorizontalScrollIndicator={false}
          data={toys}
          // numColumns={1}
          renderItem={renderToy}
          extraData={toys}
          // keyExtractor={(item, index) => String(index)}
        />
      </SafeAreaView>
    </View>
  );
}
