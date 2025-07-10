import { IImage } from './Types';

export interface IImageUploadProps {
  images: IImage[];
  setImages: React.Dispatch<React.SetStateAction<IImage[]>>;
  maxNumber?: number;
  children: React.ReactNode;
  multiple?: boolean;
}
export interface ISingleDropDownProps {
  error: any;
  data: { label: string; value: string }[];
  name: any;
  value: string;
  inputValue: any;
  setInputValue: any;
  setError: any;
  placeholder?: string;
  handler?: (arg0?: any) => void;
  onChangeText?: React.Dispatch<React.SetStateAction<string>>;
  resetHandler?: (value?: string) => void;
}
