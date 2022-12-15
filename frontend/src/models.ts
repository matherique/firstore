export enum Profile {
  ADMINISTRATOR = "ADMINISTRATOR",
  ENPLOYEE = "ENPLOYEE"
}

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  profile: Profile;
  status: boolean;
  createdAt: Date
  updatedAt: Date
}

export type Product = {
  id: string;
  name: string;
  price: number;
  createdAt: Date
  updatedAt: Date
}

export type Stock = {
  id: string;
  quantity: number;
  productId: string;
  createdAt: Date
  updatedAt: Date
}