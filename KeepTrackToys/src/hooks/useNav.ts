import {StackNavigationProp} from '@react-navigation/stack';
import {StackParamList} from '../types';
import {useNavigation} from '@react-navigation/native';

export type NavigationProps = StackNavigationProp<StackParamList>;

export function useNav() {
  return useNavigation<NavigationProps>();
}
