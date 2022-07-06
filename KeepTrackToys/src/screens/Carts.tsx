import {StackScreenProps} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from 'react-native';
import {useDispatch} from 'react-redux';
import storage from '../storage';
import {StackParamList} from '../types';
import {actions} from '../redux';
import {useAppSelector} from '../hooks/useRedux';
import {useNav} from '../hooks/useNav';

export function Carts({}: StackScreenProps<StackParamList, 'Root'>) {
  const dispatch = useDispatch();
  const [carts, setCarts] = useState([]);
  const cartAmount = useAppSelector(state => state.cart.cartAmount);

  useEffect(() => {
    getAllCarts();
  }, []);

  const nav = useNav();
  const getAllCarts = async () => {
    try {
      const dataCarts = await storage.get('carts');
      dispatch(actions.cartAmount.update(dataCarts.length));
      setCarts(dataCarts);
    } catch (e) {}
  };

  const rmCarts = async (cart: any) => {
    let dataCarts = await storage.get('carts');
    const dataToys = await storage.get('toys');
    for (let toy of dataToys) {
      if (toy.id == cart.id) {
        toy.status = 'active';
      }
    }
    cart.status = 'active';
    if (dataCarts.length == 1) {
      dataCarts = [];
    } else dataCarts.splice(dataCarts.indexOf(cart), 1);
    storage.set('carts', dataCarts);
    setCarts(dataCarts);

    storage.set('toys', dataToys);
    dispatch(actions.cartAmount.update(dataCarts.length));
  };

  const renderCart = ({item}: {item: any}) => {
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
        <TouchableOpacity
          style={{
            backgroundColor: 'red',
            padding: 5,
            borderRadius: 5,
            height: 35,
            zIndex: 100,
          }}>
          <Text onPress={() => rmCarts(item)} style={{color: '#fff'}}>
            Remove
          </Text>
        </TouchableOpacity>
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
        <TouchableOpacity
          style={{
            backgroundColor: 'orange',
            width: 80,
            padding: 5,
            borderRadius: 10,
            marginBottom: 20,
          }}
          onPress={() => nav.goBack()}>
          <Text style={{fontWeight: 'bold'}}> Turn Back</Text>
        </TouchableOpacity>
        {cartAmount == 0 ? (
          <View>
            <Text>Giỏ hàng rỗng</Text>
          </View>
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={carts}
            renderItem={renderCart}
            extraData={carts}
            keyExtractor={(item, index) => String(index)}
          />
        )}
      </SafeAreaView>
      <TouchableOpacity
        style={{
          alignItems: 'center',
          backgroundColor: 'orange',
          alignSelf: 'flex-end',
          padding: 15,
          borderRadius: 30,
        }}>
        {cartAmount == 0 ? null : (
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
            <Text style={{color: '#fff'}}>{cartAmount}</Text>
          </View>
        )}
        <Text style={{color: '#fff', fontWeight: '800'}}>Cart</Text>
      </TouchableOpacity>
    </View>
  );
}
