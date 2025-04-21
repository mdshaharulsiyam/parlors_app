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