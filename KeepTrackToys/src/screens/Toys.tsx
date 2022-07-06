import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
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
import {actions} from '../redux';
import {useAppSelector} from '../hooks/useRedux';
import {useNav} from '../hooks/useNav';
import {useFocusEffect} from '@react-navigation/native';

export function Toys({}: StackScreenProps<StackParamList, 'Root'>) {
  const dispatch = useDispatch();
  const [toys, setToys] = useState([]);
  const cartAmount = useAppSelector(state => state.cart.cartAmount);

  useFocusEffect(
    React.useCallback(() => {
      getAllToys();
      getCartAmount();
    }, []),
  );

  const nav = useNav();
  const getAllToys = async () => {
    storage.set('toys', null);
    storage.set('carts', null);
    try {
      const dataToys = await storage.get('toys');
      const dataCarts = await storage.get('carts');

      if (dataToys == null || dataCarts == null) {
        storage.set('toys', [
          {
            id: '0',
            toyDescription: 'alt attribute provides alternative',
            toyName: 'toy1',
            toySpecies: 'tank',
            status: 'active',
          },
          {
            id: '1',
            toyDescription: 'alt attribute provides',
            toyName: 'toy2',
            toySpecies: 'baber',
            status: 'active',
          },
          {
            id: '2',
            toyDescription: 'alt attribute',
            toyName: 'toy3',
            toySpecies: 'later',
            status: 'active',
          },
        ]);
        storage.set('carts', []);
        const dataToys = await storage.get('toys');
        setToys(dataToys);
      }
      dispatch(actions.cartAmount.update(dataCarts.length));
      setToys(dataToys);
    } catch (e) {}
  };

  async function getCartAmount() {
    try {
      const cartAmount = await storage.get('cartAmount');
      cartAmount == null
        ? dispatch(actions.cartAmount.update(0))
        : dispatch(actions.cartAmount.update(cartAmount));
    } catch (e) {}
  }

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
    dispatch(actions.cartAmount.update(dataCarts.length));
  };

  const rmCarts = async (cart: any) => {
    cart.status = 'active';
    const dataCarts = await storage.get('carts');
    dataCarts.splice(dataCarts.indexOf(cart), 1);
    storage.set('carts', dataCarts);

    const dataToys = await storage.get('toys');
    for (let toy of dataToys) {
      if (toy.id == cart.id) {
        toy.status = 'active';
      }
    }
    setToys(dataToys);
    storage.set('toys', dataToys);
    dispatch(actions.cartAmount.update(dataCarts.length));
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
            <Text onPress={() => rmCarts(item)} style={{color: '#fff'}}>
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
        onPress={() => nav.navigate('Carts')}
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
