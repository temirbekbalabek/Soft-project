export interface IAuthor {
    id: number;
    name: string;
    surname: string;
    date_of_birth: string;
    date_of_death: string;
}

export interface IPublisher {
    name: string;
}

export interface IClient {
  id: number;
  name: string;
  surname: string;
  username: string;
  password: string;
  email: string;
  phone: string;
  image: string;
}
// export interface IUserProfile {
//   id: number;
//   user: IUser;
//   mobile: string;
//   website: string;
//   join_date: any;
//   book: IBook[];
// }

export interface ICategory {
  id: number;
  name: string;
}

export interface IBook {
    id: number;
    title: string;
    category: ICategory;
    description: string;
    year: number;
    author: IAuthor;
    page_amount: number;
    image: string;
    quantity: number;
    price: number;
}
// export interface IReview {
//     user: IUser;
//     book: IBook;
//     text: string;
//     creation_date: any;
// }
export interface IAuthResponse {
    token: string;
    is_staff: boolean;
    id: number;
}

export interface IUser {
  id: number;
  username: string;
  password: string;
  email: string;
}
export interface ICart {
  id: number;
  client: IClient;
  books: number[];
}
export interface IFeedback {
  id: number;
  date: string;
  comment: string;
  client_id: number;
}
