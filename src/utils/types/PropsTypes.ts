import { IImage } from './Types';

export interface IImageUploadProps {
  images: any;
  setImages: React.Dispatch<React.SetStateAction<IImage[]>>;
  maxNumber?: number;
  children: React.ReactNode;
}