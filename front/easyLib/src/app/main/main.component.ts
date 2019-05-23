import { Component, OnInit } from '@angular/core';
import { ProviderService } from '../service/provider.service';
import {IBook, ICategory, IAuthor, ICart, IClient} from '../models/model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  public categories: ICategory[] = [];
  public authors: IAuthor[] = [];
  public books: IBook[] = [];
  public selectedCategoryBooks: IBook[];
  public selected = false;
  public authorSelected = false;
  public selectedAuthorBooks: IBook[];
  public selectedBook: IBook;
  public selAuthor: IAuthor;
  public isStaff: boolean;
  public carts: ICart[] = [];
  public cart: ICart;
  public client: IClient;
  searchName = '';
  constructor(
    private router: Router,
    private provider: ProviderService) { }

  ngOnInit() {
    localStorage.removeItem('selectedCategoryBook');
    localStorage.removeItem('selectedAuthorBook');
    localStorage.removeItem('selectedAuthor');
    localStorage.removeItem('selectedCategory');
    if (JSON.parse(localStorage.getItem('recommendedBookClicked')) === true) {
      this.router.navigateByUrl('book');
      localStorage.setItem('recommendedBookClicked', 'false');
    }
    this.provider.getCategories().then(res => {
      this.categories = res;
    });
    this.provider.getAuthors().then(res => {
      this.authors = res;
    });
    // this.provider.getCurUP().then(res => {
    //   this.cuProfile = res;
    // });
    this.provider.getBooks().then(res => {
      this.books = res;
    });
    this.client = JSON.parse(localStorage.getItem('client'));
    this.provider.getCartList().then( res => {
      this.carts = res;
      for (const a of this.carts) {
        if (a.client.id === this.client.id) {
          this.cart = a;
          break;
        }
      }
      localStorage.setItem('cart', JSON.stringify(this.cart));
    });
  }
  search() {
    this.provider.search(this.searchName).then( res => {
      this.books = res;
    });
  }
  loginbtnclicked() {
    if (localStorage.getItem('logged')) {
      alert('You have already logged in');
    } else {
      this.router.navigateByUrl('login');
    }
  }
  getSelectedGenreBooks(category: ICategory) {
    this.provider.getOneGenreBooks(category).then(res => {
      this.selectedCategoryBooks = res;
      this.selected = true;
      localStorage.setItem('selectedCategory', JSON.stringify(category));
      localStorage.setItem('selectedCategoryBook', JSON.stringify(this.selectedCategoryBooks));
      this.router.navigateByUrl('/genre');
      console.log(res);
    });
  }
  getSelectedAuthorBooks(author: IAuthor) {
    this.provider.getOneAuthorBooks(author).then(res => {
      this.selectedAuthorBooks = res;
      this.authorSelected = true;
      this.selAuthor = author;
      localStorage.setItem('selectedAuthor', JSON.stringify(this.selAuthor));
      localStorage.setItem('selectedAuthorBook', JSON.stringify(this.selectedAuthorBooks));
      this.router.navigateByUrl('author');
      console.log(res);
    });
  }
  getBookDetail(book: IBook) {
    this.provider.getSelectedBook(book).then( res => {
      this.selectedBook = res;
      console.log(this.selectedBook);
      localStorage.setItem('selectedBook', JSON.stringify(this.selectedBook));
      this.router.navigateByUrl('book');
    });
  }
  back() {
    this.selected = false;
  }
  backForAuthor() {
    this.authorSelected = false;
  }
  logout() {
    this.cart = JSON.parse(localStorage.getItem('cart'));
    this.client = JSON.parse(localStorage.getItem('client'));
    this.provider.clearCart(this.cart.id, this.cart.books, this.client).then(res => {
      console.log('cart cleared');
    });
    localStorage.clear();
    alert('Thanks for visiting us')
  }
}
