export interface IParlor {
  _id: string,
  name: string,
  services: string[],
  price: number,
  status: string,
  img: string,
  total_rated: number,
  rating: number
}
export interface IBusiness {
  _id: string,
  name: string,
  banner: string,
  address: {
    divisions: string,
    districts: string,
    unions: string,
    upazilas: string,
    street_address: string,
    _id: string
  },
  business_category: string,
  coordinates: number[],
  total_rated: number,
  rating: number,
}

export interface ICategory {
  _id: string;
  name: string;
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
  business_category?: string,
}
export interface IShopInputLabel {
  name: string,
  email: string,
  contact: string,
  business_category: string,
}
export interface IShopInputError {
  name: boolean,
  email: boolean,
  contact: boolean,
  business_category: boolean,
}
export interface IAddressInput {
  divisions: string,
  districts: string,
  upazilas: string,
  unions: string,
  street_address: string,
}
export interface IAddressInputLabel {
  divisions: string,
  districts: string,
  upazilas: string,
  unions: string,
  street_address: string,
}
export interface IAddressInputError {
  divisions: boolean,
  districts: boolean,
  upazilas: boolean,
  unions: boolean,
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

export interface IServicesInput {
  name: string,
  price: string,
  description: string,
  img: string,
  category: string,
  sub_category: string,
}
export interface IServicesInputLabel {
  name: string,
  price: string,
  description: string,
  img: string,
  category: string,
  sub_category: string,
}
export interface IServicesInputError {
  name: boolean,
  price: boolean,
  description: boolean,
  img: boolean,
  category: boolean,
  sub_category: boolean,
}
