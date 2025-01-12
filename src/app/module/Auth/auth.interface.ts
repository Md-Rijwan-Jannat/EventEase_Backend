export interface TUser {
  name: string;
  email: string;
  password: string;
  imageUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TLoginUser {
  email: string;
  password: string;
}
