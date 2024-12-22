import { ObjectId } from "mongoose";

export interface product {
  _id: ObjectId;
  name: string;
  price: number;
  count: number;
  image: string;
}

export interface User {
  _id: ObjectId;
  fullName: string;
  email: string;
  password: string;
  phone: number;
  check: boolean;
  refreshToken: string;
  roll: "ADMIN" | "USER";
  location?: ILocation;
}

export interface ILocation {
  province?: string;
  city?: string;
  postalCode?: string;
  fullAddress?: string;
}

export interface siteImprovementCommentType {
  _id: ObjectId | string;
  comment: string;
  user: {
    _id?: ObjectId | string;
    email?: string;
    fullName?: string;
  };
}

export interface Address {
  _id: ObjectId | string;
  user?: {
    _id?: ObjectId | string;
    fullName?: string;
    phone?: number;
  };
  province: string;
  city: string;
  postalCode: string;
  fullAddress: string;
  name: string;
  createdAt: Date;
}

