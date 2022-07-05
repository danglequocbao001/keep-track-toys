import {StackNavigationOptions} from '@react-navigation/stack';

export type StorageParamList = {
  toys: [
    {
      id: string;
      name: string;
      species: string;
      description: string;
      status: string;
    },
  ];
  carts: [
    {
      id: string;
      name: string;
      species: string;
      description: string;
      status: string;
    },
  ];
  cartAmount: number;
};

export type RootStackParamList = {
  Root: {screen: string; params: {q: string}};
  Carts: undefined;
};

export interface IScreen {
  component: any;
  options?: StackNavigationOptions;
}

export type StackParamList = RootStackParamList;
