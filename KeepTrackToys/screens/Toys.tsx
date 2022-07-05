import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from 'react-native';

import {StackScreenProps} from '@react-navigation/stack';

import storage from '../storage';
import {StackParamList} from '../types';

export function Toys({navigation}: StackScreenProps<StackParamList, 'Root'>) {
  //   const toys = useSelector(selectToy);
  const dispath = useDispatch();
  const [toys, setToys] = useState([]);

  useEffect(() => {
    getAllToys();
  }, []);

  const getAllToys = async () => {
    try {
      // storage.set('toys', [
      //   {
      //     id: '0',
      //     toyDescription: 'alt attribute provides alternative',
      //     toyName: 'toy1',
      //     toySpecies: 'tank',
      //     status: 'active',
      //   },
      //   {
      //     id: '1',
      //     toyDescription: 'alt attribute provides',
      //     toyName: 'toy2',
      //     toySpecies: 'baber',
      //     status: 'active',
      //   },
      //   {
      //     id: '2',
      //     toyDescription: 'alt attribute',
      //     toyName: 'toy3',
      //     toySpecies: 'later',
      //     status: 'active',
      //   },
      // ]);
      const data = await storage.get('toys');
      setToys(data);
    } catch (e) {
      console.log(e);
    }
  };

  const addCarts = async (cart: any) => {
    cart.status = 'in-cart';
    const dataCarts = await storage.get('carts');
    dataCarts.push(cart);
    storage.set('carts', dataCarts);

    const dataToys = await storage.get('toys');
    for (let toy of dataToys) {
      if (toy.id == cart.id) {
        toy.status = 'in-cart';
      }
    }
    setToys(dataToys);
    storage.set('toys', dataToys);
  };

  const renderToy = ({item}: {item: any}) => {
    return (
      <View
        key={item.id}
        style={{
          marginTop: 10,
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}>
        <Text>{item.id}</Text>
        <Text>{item.toyName}</Text>
        <Text>{item.toySpecies}</Text>
        <Text style={{width: 100}}>{item.toyDescription}</Text>
        {item.status == 'active' ? (
          <TouchableOpacity
            style={{
              backgroundColor: '#33cc33',
              padding: 5,
              borderRadius: 5,
              height: 35,
              zIndex: 100,
            }}>
            <Text onPress={() => addCarts(item)} style={{color: '#fff'}}>
              Thêm
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{
              backgroundColor: 'orange',
              padding: 5,
              borderRadius: 5,
              height: 35,
              zIndex: 100,
            }}>
            <Text onPress={() => addCarts(item)} style={{color: '#fff'}}>
              Carted
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <View
      style={{
        padding: 30,
        flexDirection: 'column',
        flexGrow: 1,
        justifyContent: 'space-between',
      }}>
      <SafeAreaView>
        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={toys}
          renderItem={renderToy}
          extraData={toys}
          keyExtractor={(item, index) => String(index)}
        />
      </SafeAreaView>
      <TouchableOpacity
        onPress={() => navigation.navigate('Carts')}
        style={{
          alignItems: 'center',
          backgroundColor: 'orange',
          alignSelf: 'flex-end',
          padding: 15,
          borderRadius: 30,
        }}>
        <View
          style={{
            width: 20,
            height: 20,
            borderRadius: 100,
            backgroundColor: 'red',
            position: 'absolute',
            right: 5,
            top: -5,
            alignItems: 'center',
          }}>
          <Text style={{color: '#fff'}}>1</Text>
        </View>
        <Text style={{color: '#fff', fontWeight: '800'}}>Cart</Text>
      </TouchableOpacity>
    </View>
  );
}
