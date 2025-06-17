export interface ILogin {
  email: string;
  password: string;
}
export interface IForget {
  email: string;
}
export interface ISignUp {
  'first name': string;
  'last name': string;
  email: string;
  contact: string;
  gender: string;
  'N°SIREN': string;
  address: string;
  password: string;
  confirmPassword: string;
}
export interface IAddress {
  streetNo: string;
  streetName: string;
  city: string;
  postalCode: string;
  country: string;
}
export interface IInvoiceService {
  id: string;
  service: string;
  quantity: string;
  price: string;
}

export interface INewPassword {
  password: string;
  confirmPassword: string;
}
export interface IInvoiceForm {
  name: string;
  email: string;
  contact: string;
  gender: string;
  'N°SIREN': string;
  address: string;
  services: string;
  date: string;
  status: string;
}
export interface IUpdateProfile {
  'first name': string;
  'last name': string;
  email: string;
  contact: string;
  gender: string;
  'N°SIREN': string;
  address: string;
}

export interface IChangePassword {
  'current password': string;
  'new password': string;
  'confirm password': string;
}
