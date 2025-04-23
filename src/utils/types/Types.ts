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

export interface IJila {
    _id: number;
    name: string;
    upazila: IUpazila[];
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

