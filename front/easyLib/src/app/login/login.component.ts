import { Component, OnInit } from '@angular/core';
import { ProviderService } from '../service/provider.service';
import {IBook, ICategory, IAuthor, IAuthResponse, IClient, IUser} from '../models/model';
import {Router} from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public books: IBook[] = [];
  public logged = false;
  public login = '';
  public password = '';
  public genres: ICategory[] = [];
  public authors: IAuthor[] = [];
  public selectedGenre: ICategory;
  public selectedAuthor: IAuthor;
  public genreclicked = false;
  public authorclicked = false;
  public bookcliked = false;
  public reviewclicked = false;
  public name: any = '';
  public bookName = '';
  public bookDescription = '';
  public bookImage = '';
  public bookPages: number;
  public bookYear: number;
  public bookQuantity: number;
  public bookPrice: number;
  public isStaff: boolean;
  public signed = false;
  public aname: string;
  public asurname: string;
  public adb: any = '';
  public add: any = '';
  public slogin: any = '';
  public spassword: any = '';
  public semail: any = '';
  public globalName: string;
  public noacc = false;
  public curUser: IClient;
  public selectedCategory: ICategory;
  public isAdmin: boolean;
  public clientFound = false;
  public clients: IClient[] = [];
  public users: IUser[] = [];
  public userr: IUser;
  rname: string;
  rsurname: string;
  rusername: string;
  rpassword: string;
  remail: string;
  rphone: string;
  p1 = 'title'; p2 = 'description'; p3 = 'year'; p4 = 'page amount'; p5 = 'URL of image of the book';
  p6 = 'quantity'; p7 = 'price';

  constructor(
    private router: Router,
    private provider: ProviderService) { }

  ngOnInit() {
    localStorage.removeItem('selectedCategoryBook');
    localStorage.removeItem('selectedAuthorBook');
    localStorage.removeItem('selectedAuthor');
    localStorage.removeItem('selectedCategory');
    const token = localStorage.getItem('token');
    if (token) {
      this.logged = true;
    }
    if (this.logged) {
      this.userr = JSON.parse(localStorage.getItem('curUser'));
      this.provider.getCategories().then(res => {
        this.genres = res;
      });
      this.provider.getAuthors().then(res => {
        console.log(res);
        this.authors = res;
      });
      this.provider.getBooks().then(res => {
        this.books = res;
      });
      this.curUser = JSON.parse(localStorage.getItem('user'));
    }
    this.provider.getClients().then(r => {
      this.clients = r;
      // this.curUser = r.find(asd => asd.username === this.login && asd.password === this.password);
    });
  }
  auth() {
    if (this.login !== '' && this.password !== '') {
      const value3 = (document.getElementById('client') as HTMLSelectElement).value;
      if (value3 === '1') {
        this.isAdmin = true;
        this.provider.auth(this.login, this.password).then(res => {
          localStorage.setItem('token', res.token);
          // console.log(this.curUser);
          this.logged = true;
          localStorage.setItem('logged', 'true');
          this.provider.getUsers(res.id).then( r => {
            this.userr = r;
            localStorage.setItem('curUser', JSON.stringify(this.userr));
          });
        });
      }
      if (value3 === '2') {
        console.log(value3);
        this.isAdmin = false;
        // console.log(this.clients);
        for (const a of this.clients) {
          if (a.username === this.login && a.password === this.password) {
            this.curUser = a;
            this.clientFound = true;
            break;
          }
        }
        if (this.clientFound === true) {
          alert(`You've successfully logged in`);
          localStorage.setItem('logged', 'true');
          localStorage.setItem('client', JSON.stringify(this.curUser));
          this.router.navigateByUrl('');
        } else {
          alert(`Oops, invalid login or password`);
        }
      }
      this.provider.getCategories().then(r => {
        this.genres = r;
      });
      this.provider.getAuthors().then(r => {
        this.authors = r;
      });
    } else {
      alert('Please complete the entire field.');
    }
  }
  logout() {
    this.provider.logout().then(res => {
      localStorage.clear();
      this.logged = false;
      this.isStaff = false;
      this.router.navigateByUrl('');
    });
  }
  getSelGenre(category: ICategory) {
    this.provider.getOneGenreBooks(category).then(res => {
      this.selectedGenre = category;
      console.log('ok');
      localStorage.setItem('selectedCategory', JSON.stringify(category));
      localStorage.setItem('selectedCategoryBook', JSON.stringify(res));
      this.router.navigateByUrl('genre');
    });
  }
  noaccount() {
    this.noacc = true;
  }
  getSelAuthor(author: IAuthor) {
    this.provider.getOneAuthorBooks(author).then(res => {
      this.selectedAuthor = author;
      console.log('ok');
      localStorage.setItem('selectedAuthor', JSON.stringify(author));
      localStorage.setItem('selectedAuthorBook', JSON.stringify(res));
      this.router.navigateByUrl('author');
    });
  }
  gclick() {
    this.genreclicked = true;
    this.authorclicked = false;
    this.bookcliked = false;
    this.reviewclicked = false;
  }
  bclick() {
    this.genreclicked = false;
    this.authorclicked = false;
    this.bookcliked = true;
    this.reviewclicked = false;
  }
  aclick() {
    this.genreclicked = false;
    this.authorclicked = true;
    this.bookcliked = false;
    this.reviewclicked = false;
  }
  rclick() {
    this.genreclicked = false;
    this.authorclicked = false;
    this.bookcliked = false;
    this.reviewclicked = true;
  }
  createBook() {
    const value1 = (document.getElementById('id_category') as HTMLSelectElement).value;
    this.selectedCategory = this.genres.find(a => a.id.toString() === value1);
    const value2 = (document.getElementById('id_author') as HTMLSelectElement).value;
    this.selectedAuthor = this.authors.find(a => a.id.toString() === value2);
    this.provider.createBook(this.bookName, this.bookDescription, this.selectedCategory,
      this.bookYear, this.bookPages, this.selectedAuthor, this.bookImage, this.bookQuantity,
      this.bookPrice).then(res => {
      this.books.push(res);
      console.log('kek');
    });
  }

  createCategory() {
    if (this.name !== '' ) {
      this.provider.createCategory(this.name).then(res => {
        this.name = '';
        this.genres.push(res);
      });
    }
  }
  createAuthor() {
     if (this.aname !== '' && this.asurname !== '' && this.adb !== '' && this.add !== '' ) {
        this.provider.createAuthor(this.aname, this.asurname, this.adb, this.add).then(res => {
        this.aname = '';
        this.asurname = '';
        this.adb = '';
        this.add = '';
        this.authors.push(res);
      });
    }

     console.log('kej');

  }
  deleteBook() {
    this.provider.deleteBook(this.books.find(a => a.title === this.globalName)).then(res => res);
  }
  deleteAuthor() {
    console.log(this.authors.find(a => a.name === this.globalName));
    this.provider.deleteAuthor(this.authors.find(a => a.name === this.globalName)).then(res => {
      this.provider.getAuthors().then(r => {
        this.authors = r;
      });
    });
  }
  deleteGenre() {
    this.provider.deleteGenre(this.genres.find(a => a.name === this.globalName)).then(res => {
      this.provider.getCategories().then( rres => {
        this.genres = rres;
      });
    });
  }
  signup() {
    if (this.rusername !== '' && this.rpassword !== '' && this.rname !== '' && this.rsurname !== '' &&
      this.remail !== '' && this.rphone !== '') {
      console.log('absd');
      this.provider.signup(this.rname, this.rsurname, this.rusername, this.rpassword, this.remail, this.rphone).then( res => {
        console.log('Client created', res);
        localStorage.setItem('client', JSON.stringify(res));
        this.provider.createCart(res).then( r => {
          localStorage.setItem('cart', JSON.stringify(r));
          console.log('Cart created');
        });
        this.router.navigateByUrl('');
      });
    } else {
        alert('Заполните все поля!');
      }
  }
}
