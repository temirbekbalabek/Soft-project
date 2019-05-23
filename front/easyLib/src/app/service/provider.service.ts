import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MainService } from './main.service';
import {IAuthor, IBook, ICategory, IPublisher, IAuthResponse, IClient, IUser, ICart, IFeedback} from '../models/model';

@Injectable({
  providedIn: 'root'
})
export class ProviderService extends MainService {
  constructor(http: HttpClient) {
    super(http);
  }
  getBooks(): Promise<IBook[]> {
    return this.get(`http://localhost:8000/api/books/`, {});
  }
  getCategories(): Promise<ICategory[]> {
    return this.get(`http://localhost:8000/api/categories/`, {});
  }
  getAuthors(): Promise<IAuthor[]> {
    return this.get(`http://localhost:8000/api/authors/`, {});
  }
  auth(login: string, ppassword: string): Promise<IAuthResponse> {
    return this.post(`http://localhost:8000/api/login/`, {
    username: login,
    password: ppassword
  });
  }
  logout(): Promise<any> {
    return this.post('http://localhost:8000/api/logout/', {});
  }
  getOneGenreBooks(category: ICategory): Promise<IBook[]> {
    return this.get(`http://localhost:8000/api/categories/${category.id}/books/`, {});
  }
  getOneAuthorBooks(author: IAuthor): Promise<IBook[]> {
    return this.get(`http://localhost:8000/api/authors/${author.id}/books/`, {});
  }
  getSelectedGenre(category: ICategory): Promise<ICategory> {
    return this.get(`http://localhost:8000/api/categories/${category.id}/`, {});
  }
  getSelectedAuthor(author: IAuthor): Promise<IAuthor> {
    return this.get(`http://localhost:8000/api/authors/${author.id}/`, {});
  }
  createBook(btitle: string, bdescription: string, cate: ICategory,
             byear: number, bpage: number, auth: IAuthor, img: string, q: number, pprice: number): Promise<IBook> {
    return this.post(`http://localhost:8000/api/books/`, {
      title: btitle,
      category: cate,
      description: bdescription,
      year: byear,
      author: auth,
      page_amount: bpage,
      image: img,
      quantity: q,
      price: pprice
      // added_by:book.added_by,
    });
  }
  createCategory(nname: any): Promise<ICategory> {
    return this.post('http://localhost:8000/api/categories/', {
      name: nname,
    });
  }
  createAuthor(nname: string, ssurname: string, dateOfBirth: string, dateOfDeath: string): Promise<IAuthor> {
    return this.post(`http://localhost:8000/api/authors/`, {
      name: nname,
      surname: ssurname,
      date_of_birth: dateOfBirth,
      date_of_death: dateOfDeath
    });
  }
  getSelectedBook(book: IBook): Promise<IBook> {
    return this.get( `http://localhost:8000/api/books/${book.id}/`, {});
  }
  getClients(): Promise<IClient[]> {
    return this.get('http://localhost:8000/api/clients/', {});
  }
  getClient(id: number): Promise<IClient> {
    return this.get(`http://localhost:8000/api/clients/${id}/`, {});
  }
  deleteBook(book: IBook): Promise<any> {
    return this.delet( `http://localhost:8000/api/books/${book.id}/`, {});
  }
  deleteAuthor(author: IAuthor): Promise<any> {
    return this.delet(`http://localhost:8000/api/authors/${author.id}/`, {});
  }
  deleteGenre(genre: ICategory): Promise<any> {
    return this.delet(`http://localhost:8000/api/categories/${genre.id}/`, {});
  }
  signup(n: string, s: string, u: string, p: string, e: string, ph: string): Promise<IClient> {
    return this.post(`http://localhost:8000/api/clients/`, {
      name: n,
      surname: s,
      username: u,
      password: p,
      email: e,
      phone: ph,
      image: 'https://cdn1.vectorstock.com/i/1000x1000/82/55/anonymous-user-circle-icon-vector-18958255.jpg'
    });
  }
  clearCart(id: number, booksToAdd: number[], cclient: IClient): Promise<ICart> {
    return this.put(`http://localhost:8000/api/carts/${id}/`, {
      books: [1],
      client: cclient
    });
  }
  search(searchName: string): Promise<IBook[]> {
    return this.get(`http://localhost:8000/api/books/?search=${searchName}`, {});
  }
  createCart(c: IClient): Promise<ICart> {
    return this.post(`http://localhost:8000/api/carts/`, {
      client: c,
      books: [1]
    });
  }
  getCartList(): Promise<ICart[]> {
    return this.get(`http://localhost:8000/api/carts/`, {} );
  }
  addToCart(id: number, booksToAdd: number[], cclient: IClient): Promise<ICart> {
    return this.put(`http://localhost:8000/api/carts/${id}/`, {
      books: booksToAdd,
      client: cclient
    });
  }
  getUsers(id: number): Promise<IUser> {
    return this.get(`http://localhost:8000/api/users/${id}/`, {} );
  }
  getFeedback(book: IBook): Promise<IFeedback[]> {
    return this.get(`http://localhost:8000/api/books/${book.id}/feedback/`, {});
  }
  sendFeedback(commentt: string): Promise<any> {
    return this.post(`http://localhost:8000/api/books/${JSON.parse(localStorage.getItem('selectedBook')).id}/feedback/`, {
      client_id: JSON.parse(localStorage.getItem('client')).id,
      date: '2019-04-26T13:20:52Z',
      comment: commentt,
      book_id: JSON.parse(localStorage.getItem('selectedBook')).id,
    });
  }
}
