import type {NavigatorScreenParams} from '@react-navigation/native';

export type StackParamList = {
  ServiceAddEdit: undefined;
  SignIn: undefined;
  SignUp: undefined;
  Forget: undefined;
  Reset: undefined;
  Verify: {from: 'signup' | 'forget'; email: string};
  Details: {id: string};
  ServiceDetails: {id: string};
  Messages: {id: string};
};

export type TabParamList = {
  Home: undefined;
  Parlors: {search?: string} | undefined;
  Bookings: undefined;
  Workspace: undefined;
  Stacks: NavigatorScreenParams<StackParamList> | undefined;
};

export type ScreenParamsType = {
  Home: undefined;
  Parlors: {search?: string} | undefined;
  Bookings: undefined;
  Workspace: undefined;
  Profile: undefined;
  Settings: undefined;
  Details: {id: string};
  Messages: {id: string};
  SignIn: undefined;
  SignUp: undefined;
  Forget: undefined;
  ChangePassword: undefined;
  About: undefined;
  Terms: undefined;
  Privacy: undefined;
  Contact: undefined;
  FAQ: undefined;
  Support: undefined;
  Feedback: undefined;
  Notifications: undefined;
  Cart: undefined;
  Checkout: undefined;
  Shops: undefined;
  Stacks: NavigatorScreenParams<StackParamList> | undefined;
  Order: undefined;
  Tabs: NavigatorScreenParams<TabParamList> | undefined;
  Verify: {from: 'signup' | 'forget'; email: string};
  Reset: undefined;
  ServiceAddEdit: undefined;
  ServiceDetails: {id: string};
  changePassword: undefined;
  VendorSignUp: undefined;
};
