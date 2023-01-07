interface DocumentResult<T> {
  _doc: T;
}

export interface IUser extends DocumentResult<IUser> {
  username: string,
  email: string,
  country: string,
  img: string,
  city: string,
  phone: string,
  password: string,
  isAdmin: boolean
}
