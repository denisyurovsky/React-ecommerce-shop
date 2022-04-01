import { User } from '../../ts/models/user.model';

export interface DispatchedAction {
  payload: undefined;
  type: string;
}

export interface LoginArgs {
  password: string;
  email: string;
  isKeep: boolean;
}

export interface RegArgs {
  [key: string]: string;
}

export interface LoginResponse {
  data: {
    accessToken: string;
    user: User;
  };
}

interface WishlistCheck {
  id: number;
  newName: string;
}

interface WishlistRename {
  productId: number;
  wishlistName: string;
}

interface WishlistCreate {
  id: string;
  name: string;
  productIds: number[];
}

export interface WishlistAction {
  type: string;
  argument: WishlistRename & WishlistCreate & WishlistCheck & string;
}
