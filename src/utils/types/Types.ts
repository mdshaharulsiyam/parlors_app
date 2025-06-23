export interface IParlor {
  _id: string;
  name: string;
  rating: number;
  address: string;
  category: string; // Added category
  img: string
}

export interface ICategory {
  _id: string;
  category: string;
  img: string
}

export interface IPostOffice {
  _id: number;
  name: string;
};

export interface IUnion {
  _id: number;
  name: string;
};

export interface IUpazila {
  _id: number;
  name: string;
};

export interface SelectTypes {
  label: string, value: string
};

export interface IBooking {
  _id: string;
  parlor: string;
  worker: string;
  date: string;
  time: string;
  status: 'pending' | 'complete' | 'accepted' | 'canceled';
  service: string;
  parlorImage: string
}

export interface IConversation {
  _id: string;
  name: string;
  message: string;
  img: string;
}
export interface IImage {
  uri: string,
  name: string,
  type: string,
  mimeType: string,
}

export interface IShopInput {
  name: string,
  email?: string,
  contact?: string,
}
export interface IShopInputLabel {
  name: string,
  email: string,
  contact: string,
}
export interface IShopInputError {
  name: boolean,
  email: boolean,
  contact: boolean,
}
export interface IAddressInput {
  district: string,
  sub_district: string,
  union: string,
  post: string,
  street_address: string,
}
export interface IAddressInputLabel {
  district: string,
  sub_district: string,
  union: string,
  post: string,
  street_address: string,
}
export interface IAddressInputError {
  district: boolean,
  sub_district: boolean,
  union: boolean,
  post: boolean,
  street_address: boolean,
}
export interface IUserProfile {
  _id: string;
  name: string;
  email: string;
  phone: string;
  img: string | null;
  gender: string;
  role: string;
  block: boolean;
  is_verified: boolean;
  provider: string;
  accessToken: string;
  use_type: string;
  is_identity_verified: boolean;
  documents: any[];
  stripe: any;
  point: number;
  createdAt: string;
  updatedAt: string;
}