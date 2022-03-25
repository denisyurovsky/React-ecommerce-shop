export enum Gender {
  Male = 'male',
  Female = 'female',
  Unknown = '',
}

export enum Title {
  Male = 'Mr.',
  Female = 'Mrs.',
}

export enum Role {
  Admin = 'admin',
  Seller = 'seller',
  Consumer = 'consumer',
  Guest = 'guest',
}

export enum OrderStatus {
  WaitingForPayment = 1,
  Paid,
  Delivered,
  Cancelled,
}

export enum Methods {
  Post = 'POST',
  Put = 'PUT',
  Patch = 'PATCH',
  Get = 'GET',
  Delete = 'DELETE',
}

export enum FetchStatus {
  Pending = 'loading',
  Fulfilled = 'fulfilled',
  Rejected = 'rejected',
  Idle = 'idle',
}

export enum Lock {
  Locked = 'locked',
}

export type AuthStatus = FetchStatus | Lock;
